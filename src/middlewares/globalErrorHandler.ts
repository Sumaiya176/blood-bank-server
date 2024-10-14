import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log("global", err);
  let statusCode = 500;
  let message = "Something went wrong";
  let errMessage = "Something went wrong";

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errMessage = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errMessage: err.message,
  });
};

export default globalErrorHandler;
