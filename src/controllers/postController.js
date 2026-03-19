import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

export const createPost = async (req, res) => {
  const post = await Post.create(req.body);

  await User.findByIdAndUpdate(req.user.id, {
    $addToSet: { posts: post._id }
  });

  res.json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post eliminado" });
};