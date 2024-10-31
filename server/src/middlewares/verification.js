import { StatusCodes } from "http-status-codes";
import CreateError from "../utils/error.js";
import jwt from "jsonwebtoken";

export const isAuthorized = async (req, res, next) => {
  let accessToken;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader) {
    return next(CreateError("Unauthorized", StatusCodes.UNAUTHORIZED));
  }
  if (authHeader && authHeader.startsWith("Bearer ")) {
    accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(CreateError("Unauthorized", StatusCodes.UNAUTHORIZED));
    }
  }
  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET || "");
    if (!payload) {
      return next(CreateError("Invalid access token", StatusCodes.UNAUTHORIZED));
    }

    if (payload.exp < Date.now().valueOf() / 1000) {
      return next(CreateError("Access token expired", StatusCodes.UNAUTHORIZED));
    }

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(CreateError("Access denied", StatusCodes.FORBIDDEN));
    }
    next();
  };
};
