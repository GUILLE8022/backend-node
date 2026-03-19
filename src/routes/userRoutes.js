import express from "express";
import { getUsers, deleteUser, changeRole } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getUsers);
router.delete("/:id", auth, deleteUser);
router.put("/role/:id", auth, changeRole);

export default router;