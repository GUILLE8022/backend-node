import { Post } from "../models/Post.js";

export const seedPosts = async () => {
  await Post.deleteMany({});
  await Post.insertMany([
    { title: "Post 1", content: "Contenido de post 1" },
    { title: "Post 2", content: "Contenido de post 2" },
    { title: "Post 3", content: "Contenido de post 3" }
  ]);
  console.log("Seed ejecutada");
};