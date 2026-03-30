import express from "express";
import upload from "../middlewares/upload.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeRole
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", auth, getUsers);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, upload.single("image"), updateUser);
router.delete("/:id", auth, deleteUser);


router.put("/role/:id", auth, isAdmin, changeRole);

export default router;