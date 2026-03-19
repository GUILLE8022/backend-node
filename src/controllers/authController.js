import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    let imageData = {};

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageData = {
        image: result.secure_url,
        public_id: result.public_id
      };
    }

    const user = await User.create({
      username,
      email,
      password: hash,
      ...imageData
    });

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ message: "Error" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token });
};