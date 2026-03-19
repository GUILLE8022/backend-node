import { Post } from "../models/Post.js";

export const seedPosts = async () => {
  await Post.insertMany([
    { title: "Post 1", content: "Contenido 1" },
    { title: "Post 2", content: "Contenido 2" }
  ]);

  console.log("Seed ejecutada");
};