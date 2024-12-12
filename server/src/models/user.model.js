import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    avatar: {
      type: String,
      default: "http://localhost:8080/public/images/1733220137693-bongoaigiao2.jpg"
    },
    password: {
      type: String,
      required: true
    },
    google_auth: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },
    token: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Sign access token
userSchema.methods.signAccessToken = function () {};

// Sign refresh token
userSchema.methods.signRefreshToken = function () {};

const User = mongoose.model("User", userSchema);
export default User;
