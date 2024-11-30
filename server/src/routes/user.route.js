import express from "express";
import userController from "../controllers/user.controller.js";
import { isAuthorized, authorizeRoles } from "../middlewares/verification.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", isAuthorized, authorizeRoles("ADMIN"), userController.getUsers);

router.get("/profile", isAuthorized, userController.getUserProfile);

router.put("/avatar", isAuthorized, upload.single("avatar"), userController.updateAvatar);

export default router;
