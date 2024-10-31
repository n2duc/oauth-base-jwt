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

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password -token");
    return res.status(StatusCodes.OK).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getUsers,
  getUserProfile
};
