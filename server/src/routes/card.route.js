import express from "express";
import cardController from "../controllers/card.controller.js";
import { upload } from "../utils/multer.js";
import { isAuthorized } from "../middlewares/verification.js";

const router = express.Router();

router.post("/", isAuthorized, upload.single("thumbail"), cardController.createNewCard);

router.delete("/:id", cardController.deleteCard);

router.put("/:id", cardController.updateCard);

router.get("/", cardController.getAllCard);

router.get("/:id", cardController.getCardDetail);

export default router;
