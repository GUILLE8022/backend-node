import { Post } from "../models/Post.js";
import { User } from "../models/User.js";


export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user.id
    });

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { posts: post._id }
    });

    res.json(post);

  } catch (error) {
    res.status(500).json({ message: "Error al crear post" });
  }
};


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email");

    res.json(posts);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener posts" });
  }
};


export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username email");

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    res.json(post);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener post" });
  }
};


export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    if (
      post.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "No autorizado" });
    }

    Object.assign(post, req.body);
    await post.save();

    res.json(post);

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar post" });
  }
};


export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    if (
      post.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await User.findByIdAndUpdate(post.author, {
      $pull: { posts: post._id }
    });

    await post.deleteOne();

    res.json({ message: "Post eliminado" });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar post" });
  }
};