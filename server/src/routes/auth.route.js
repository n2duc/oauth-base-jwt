import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/google", authController.googleAuth);

router.post("/logout", authController.logout);

router.get("/refresh", authController.refreshToken);

export default router;
