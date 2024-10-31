import express from "express";
import userController from "../controllers/user.controller.js";
import { isAuthorized, authorizeRoles } from "../middlewares/verification.js";

const router = express.Router();

router.get("/", isAuthorized, authorizeRoles("ADMIN"), userController.getUsers);

export default router;
