import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import CreateError from "../utils/error.js";
import { generateURL } from "../utils/generateURL.js";

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

const updateAvatar = async (req, res, next) => {
  try {
    const image = req.file ? req.file.filename : "default_avatar.jpg";
    if (!image) {
      return next(CreateError("Please upload an image", StatusCodes.BAD_REQUEST));
    }
    const imageURL = generateURL(req, image);
    const user = await User.findByIdAndUpdate(req.user._id, { avatar: imageURL }, { new: true }).select(
      "-password -token"
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Update avatar successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getUsers,
  getUserProfile,
  updateAvatar
};
