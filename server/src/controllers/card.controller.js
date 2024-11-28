import { StatusCodes } from "http-status-codes";
import CreateError from "../utils/error.js";
import Card from "../models/card.model.js";

const createNewCard = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;
    if (!title) {
      return next(CreateError("Title is required", StatusCodes.BAD_REQUEST));
    }
    const image = req.file ? req.file.filename : null;
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const imageURL = image ? `${baseURL}/public/images/${image}` : null;

    const card = new Card({
      title,
      description,
      image: imageURL,
      status,
      priority,
      author: req.user._id
    });
    await card.save();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Create new card successfully",
      data: card
    });
  } catch (error) {
    next(error);
  }
};

const deleteCard = (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json({ message: "Delete card" });
  } catch (error) {
    next(error);
  }
};

const updateCard = (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json({ message: "Update card" });
  } catch (error) {
    next(error);
  }
};

const getAllCard = (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json({ message: "Get all card" });
  } catch (error) {
    next(error);
  }
};

const getCardDetail = (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).json({ message: "Get card detail" });
  } catch (error) {
    next(error);
  }
};

export default {
  createNewCard,
  deleteCard,
  updateCard,
  getAllCard,
  getCardDetail
};
