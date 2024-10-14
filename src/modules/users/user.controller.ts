import { RequestHandler } from "express";
import userService from "./user.service";
import { sendResponse } from "../../util/sendResponse";

const activeUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.getAllActiveUsers();

    res.status(200).json({
      success: true,
      message: "Retrieved all active users",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const usersWithDonationHistory: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.getAllUsersWithDonationHistory();

    res.status(200).json({
      success: true,
      message: "Retrieved all users with respective donation history",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUser: RequestHandler = async (req, res, next) => {
  const { name } = req.query;
  try {
    const result = await userService.getSingleUser(name as string);

    res.status(200).json({
      success: true,
      message: "Retrieved single user successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    //console.log("user from controller", user);
    const result = await userService.createUserRegistration(user);

    res.status(200).json({
      success: true,
      message: "User is Registered successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  console.log("err");
  try {
    const { id } = req.params;
    const { user } = req.body;
    const result = await userService.updateUserRegistration(id, user);

    sendResponse(res, {
      success: true,
      message: "User profile is updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  createUser,
  updateUser,
  activeUsers,
  usersWithDonationHistory,
  getSingleUser,
};
