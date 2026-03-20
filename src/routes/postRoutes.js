import express from "express";
import { auth } from "../middlewares/auth.js";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

export default router;