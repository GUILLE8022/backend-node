import express from "express";
import { auth } from "../middlewares/auth.js";
import * as controller from "../controllers/postController.js";

const router = express.Router();

router.post("/", auth, controller.createPost);
router.get("/", controller.getPosts);
router.get("/:id", controller.getPostById);
router.put("/:id", auth, controller.updatePost);
router.delete("/:id", auth, controller.deletePost);

export default router;