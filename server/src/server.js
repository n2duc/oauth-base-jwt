import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./utils/db.js";
import routes from "./routes/index.route.js";
import ErrorHandler from "./middlewares/error-handler.js";

const app = express();

const START_SERVER = () => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true
    })
  );

  app.use("/api/v1", routes);

  app.get("/", (req, res) => {
    res.send("Welcome to Auth Server from N2D");
  });

  app.use(ErrorHandler);

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectMongoDB();
  });
};

(async () => {
  try {
    console.log("Starting Server...");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
