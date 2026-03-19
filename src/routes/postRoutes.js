import express from "express";
import { createPost, getPosts, deletePost } from "../controllers/postController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.delete("/:id", auth, deletePost);

export default router;