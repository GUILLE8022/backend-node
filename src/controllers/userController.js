import { User } from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const getUsers = async (req, res) => {
  const users = await User.find().populate("posts");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (req.user.id !== user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "No permitido" });
  }

  if (user.public_id) {
    await cloudinary.uploader.destroy(user.public_id);
  }

  await user.deleteOne();

  res.json({ message: "Usuario eliminado" });
};

export const changeRole = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Solo admin" });
  }

  const user = await User.findById(req.params.id);
  user.role = "admin";
  await user.save();

  res.json(user);
};