import User from "../models/user.model.js";
import CreateError from "../utils/error.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

const JWTSecure = {
  ACCESS: {
    SECRET: process.env.ACCESS_TOKEN_SECRET,
    EXPIRE: "10m"
  },
  REFRESH: {
    SECRET: process.env.REFRESH_TOKEN_SECRET,
    EXPIRE: "7d"
  }
};

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
    const access_token = generateToken(userData, JWTSecure.ACCESS.SECRET, JWTSecure.ACCESS.EXPIRE);
    const refresh_token = generateToken(userData, JWTSecure.REFRESH.SECRET, JWTSecure.REFRESH.EXPIRE);

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

const googleAuth = async (req, res, next) => {
  const { name, email, photoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user?.avatar
      };
      const access_token = generateToken(userData, JWTSecure.ACCESS.SECRET, JWTSecure.ACCESS.EXPIRE);
      const refresh_token = generateToken(userData, JWTSecure.REFRESH.SECRET, JWTSecure.REFRESH.EXPIRE);

      user.token = refresh_token;
      await user.save();

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
    } else {
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        avatar: photoUrl
      });

      const userData = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser?.avatar
      };
      const access_token = generateToken(userData, JWTSecure.ACCESS.SECRET, JWTSecure.ACCESS.EXPIRE);
      const refresh_token = generateToken(userData, JWTSecure.REFRESH.SECRET, JWTSecure.REFRESH.EXPIRE);

      newUser.token = refresh_token;
      await newUser.save();

      return res.status(StatusCodes.OK).json({
        data: userData,
        access_token,
        message: "Login successful"
      });
    }
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

    const decoded = await verifyToken(refreshToken, JWTSecure.REFRESH.SECRET);
    if (foundUser.username !== decoded.username) {
      return next(CreateError("Access denied", StatusCodes.FORBIDDEN));
    }

    const userData = {
      _id: decoded._id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role
    };

    const access_token = generateToken(userData, JWTSecure.ACCESS.SECRET, JWTSecure.ACCESS.EXPIRE);

    return res.status(StatusCodes.OK).json({ access_token });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  logout,
  googleAuth,
  refreshToken
};
