import { User } from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const getUsers = async (req, res) => {
  const users = await User.find().populate("posts");
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).populate("posts");
  res.json(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (req.user.id !== user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "No autorizado" });
  }

  Object.assign(user, req.body);
  await user.save();

  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (req.user.id !== user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "No autorizado" });
  }

  if (user.image?.public_id) {
    await cloudinary.uploader.destroy(user.image.public_id);
  }

  await user.deleteOne();

  res.json({ message: "Usuario eliminado" });
};

export const changeRole = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.role = req.body.role;
  await user.save();

  res.json(user);
};