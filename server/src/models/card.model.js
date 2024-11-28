import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["TO_DO", "IN_PROGRESS", "DONE"],
      default: "TO_DO"
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM"
    }
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
