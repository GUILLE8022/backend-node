import mongoose from "mongoose";
import dotenv from "dotenv";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

dotenv.config();

const USER_EMAIL = "admin@gmail.com";

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.findOne({ email: USER_EMAIL });

    if (!user) {
      console.log("❌ Usuario no encontrado:", USER_EMAIL);
      process.exit(1);
    }

    await Post.deleteMany({ author: user._id });

    const posts = await Post.insertMany([
      {
        title: "Post 1",
        content: "Contenido 1",
        author: user._id
      },
      {
        title: "Post 2",
        content: "Contenido 2",
        author: user._id
      }
    ]);

    await User.findByIdAndUpdate(user._id, {
      posts: posts.map(p => p._id)
    });

    console.log(`✅ Seed ejecutado para: ${user.email}`);

    await mongoose.connection.close();
    process.exit();

  } catch (error) {
    console.error("SEED ERROR:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seed();