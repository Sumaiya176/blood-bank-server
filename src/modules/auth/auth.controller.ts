import { RequestHandler } from "express";
import { sendResponse } from "../../util/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

// ------------ user login ------------
const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await AuthServices.loginUser(req.body);
    console.log("result", result);
    const { refreshToken, accessToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: config.node_env === "production",
      httpOnly: true,
    });

    sendResponse(res, {
      success: true,
      message: "User logged in successfully",
      data: {
        accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ------------ user login ------------
const logOut: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");

    sendResponse(res, {
      success: true,
      message: "User logged out",
      data: {
        message: "User logged out",
      },
    });
  } catch (err) {
    next(err);
  }
};

// ------------ user login ------------
const refreshToken: RequestHandler = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  try {
    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
      success: true,
      message: "Refresh token is retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// ---------- during registration similar user name checking ----------
const similarUserNameChecking: RequestHandler = async (req, res, next) => {
  const result = await AuthServices.userNameChecking(req.body);

  if (result.length > 0) {
    sendResponse(res, {
      success: true,
      message:
        "This username is too similar to existing usernames. Please choose a different one.",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: false,
      message: "This username is not exist.",
      data: result,
    });
  }
};

export const AuthControllers = {
  loginUser,
  logOut,
  refreshToken,
  similarUserNameChecking,
};
