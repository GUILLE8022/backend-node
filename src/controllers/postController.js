import { Post } from "../models/Post.js";
import { User } from "../models/User.js";


export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title y content son requeridos" });
    }

    const post = await Post.create({ title, content });
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { posts: post._id }
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();

    res.json({ message: "Post actualizado", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });

    await post.deleteOne();
    res.json({ message: "Post eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar post" });
  }
};