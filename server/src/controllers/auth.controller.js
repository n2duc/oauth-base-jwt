import User from "../models/user.model.js";
import CreateError from "../utils/error.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

const ACCESS_TOKEN_EXPIRE = "10m";
const REFRESH_TOKEN_EXPIRE = "7d";

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
      role: user.role,
      avatar: user?.avatar
    };

    // Generate access token and refresh token
    const access_token = generateToken(userData, process.env.ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRE);
    const refresh_token = generateToken(userData, process.env.REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRE);

    await User.findByIdAndUpdate(user._id, { token: refresh_token });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
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
    const cookie = req.cookies;
    if (!cookie.refresh_token) {
      return res.status(StatusCodes.NO_CONTENT);
    }
    const refreshToken = cookie.refresh_token;
    const user = await User.findOne({ token: refreshToken });
    if (!user) {
      res.clearCookie("refresh_token", { httpOnly: true, sameSite: "None", secure: true });
      return res.status(StatusCodes.NO_CONTENT);
    }

    user.token = null;
    await user.save();

    res.clearCookie("refresh_token", { httpOnly: true, sameSite: "None", secure: true });
    return res.status(StatusCodes.OK).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie.refresh_token) {
      return next(CreateError("Access denied (Miss Cookie)", StatusCodes.UNAUTHORIZED));
    }
    const refreshToken = cookie.refresh_token;

    const foundUser = await User.findOne({ token: refreshToken }).exec();

    if (!foundUser) {
      return next(CreateError("Access denied", StatusCodes.FORBIDDEN));
    }

    const decoded = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (foundUser.username !== decoded.username) {
      return next(CreateError("Access denied", StatusCodes.FORBIDDEN));
    }

    const userData = {
      _id: decoded._id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role
    };

    const access_token = generateToken(userData, process.env.ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRE);

    return res.status(StatusCodes.OK).json({ access_token });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  logout,
  refreshToken
};
