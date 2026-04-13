import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import * as controller from "../controllers/userController.js";

const router = express.Router();

router.get("/", auth, controller.getUsers);
router.get("/:id", auth, controller.getUserById);
router.put("/:id", auth, controller.updateUser);
router.delete("/:id", auth, controller.deleteUser);
router.put("/role/:id", auth, isAdmin, controller.changeRole);

export default router;