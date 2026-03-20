import { User } from "../models/User.js";
import cloudinary from "../config/cloudinary.js";


export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("posts", "title content");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts", "title content");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};
    const username = body.username;
    const email = body.email;
    const password = body.password;

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({ message: "No autorizado para actualizar este usuario" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (username) user.username = username;
    if (email) user.email = email;

    if (password) {
      const bcrypt = await import("bcrypt");
      user.password = await bcrypt.default.hash(password, 10);
    }

    if (req.file) {
      if (user.image?.public_id) {
        await cloudinary.uploader.destroy(user.image.public_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "users"
      });

      user.image = {
        url: result.secure_url,
        public_id: result.public_id
      };
    }

    await user.save();
    res.json({ message: "Usuario actualizado", user });
  } catch (error) {
    console.error("Error updateUser:", error);
    res.status(500).json({ message: error.message || "Error actualizando usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (req.user.id !== user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "No puedes eliminar este usuario" });
    }

    if (user.image?.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id);
    }

    await user.deleteOne();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

export const changeRole = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Solo admin" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const { role } = req.body;
    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Role inválido" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "Role actualizado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cambiar role" });
  }
};