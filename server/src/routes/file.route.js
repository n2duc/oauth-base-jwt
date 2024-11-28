import express from "express";
import { upload } from "../utils/multer.js";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "File not found" });
    }
    return res.status(StatusCodes.OK).json({
      message: "File uploaded successfully",
      fileName: req.file.filename
    });
  } catch (error) {
    next(error);
  }
});

router.post("/upload-multiple", upload.array("files", 10), (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Files not found" });
    }
    return res.status(StatusCodes.OK).json({ message: "Files uploaded successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
