import User from "../models/user.model.js";
import CreateError from "../utils/error.js";
import { generateToken } from "../utils/jwt.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return next(CreateError("User already exists", StatusCodes.BAD_REQUEST));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ username, email, password: hashedPassword });
    return res.status(StatusCodes.CREATED).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return next(CreateError("Invalid credentials", StatusCodes.BAD_REQUEST));
    }

    const isMatchPassword = await user.comparePassword(password);
    if (!isMatchPassword) {
      return next(CreateError("Invalid credentials", StatusCodes.BAD_REQUEST));
    }

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    // Generate access token and refresh token
    const access_token = generateToken(userData, process.env.ACCESS_TOKEN_SECRET, "15m");
    const refresh_token = generateToken(userData, process.env.REFRESH_TOKEN_SECRET, "7d");

    await User.findByIdAndUpdate(user._id, { token: refresh_token });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(StatusCodes.OK).json({
      data: userData,
      access_token,
      message: "Login successful"
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(StatusCodes.OK).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  logout
};
