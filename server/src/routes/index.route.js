import express from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import fileRoute from "./file.route.js";
import cardRoute from "./card.route.js";

const router = express.Router();

router.use("/auth", authRoute);

router.use("/user", userRoute);

router.use("/file", fileRoute);

router.use("/card", cardRoute);

router.get("/test", (req, res) => {
  res.send("Test route");
});

export default router;
