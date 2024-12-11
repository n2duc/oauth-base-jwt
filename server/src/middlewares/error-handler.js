import { StatusCodes } from "http-status-codes";

// eslint-disable-next-line no-unused-vars
const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  if (errMsg === "jwt expired") {
    return res.status(StatusCodes.GONE).json({
      success: false,
      status: StatusCodes.GONE,
      message: "Access token expired"
    });
  }
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {}
  });
};

export default ErrorHandler;
