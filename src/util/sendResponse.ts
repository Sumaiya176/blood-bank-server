import { Response } from "express";

type TResponseData<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const sendResponse = <T>(
  res: Response,
  responseData: TResponseData<T>
) => {
  const statusCode = 200;
  res.status(statusCode).json({
    success: responseData.success,
    message: responseData.message,
    data: responseData.data,
  });
};
