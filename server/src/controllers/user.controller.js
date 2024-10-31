import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -token");
    return res.status(StatusCodes.OK).json({
      success: true,
      data: users
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  getUsers
};
