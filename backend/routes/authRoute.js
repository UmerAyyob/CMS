import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.get("/login", authMiddleware, login);
router.post("/logout", logout);

export default router;
