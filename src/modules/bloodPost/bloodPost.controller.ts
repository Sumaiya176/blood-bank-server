import { RequestHandler } from "express";
import bloodPostService from "./bloodPost.service";
import { sendResponse } from "../../util/sendResponse";

const getAllBloodPosts: RequestHandler = async (req, res, next) => {
  const result = await bloodPostService.getAllBloodPosts();

  sendResponse(res, {
    success: true,
    message: "Got all blood event posts successfully",
    data: result,
  });
};

const createBloodPost: RequestHandler = async (req, res, next) => {
  const { bloodPost } = req.body;
  const result = await bloodPostService.bloodPostSendToDatabase(bloodPost);

  sendResponse(res, {
    success: true,
    message: "Blood event posted successfully",
    data: result,
  });
};

const updateBloodPost: RequestHandler = async (req, res, next) => {
  console.log("err");
  try {
    const { id } = req.params;
    const { bloodPost } = req.body;
    console.log(id, bloodPost);
    const result = await bloodPostService.updateBloodPostToDatabase(
      id,
      bloodPost
    );

    sendResponse(res, {
      success: true,
      message: "Blood event post updated successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createDonationHistory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { postId } = req.body;
  // console.log(id, req.body);
  try {
    const result = await bloodPostService.saveDonationHistoryIntoDb(id, postId);

    sendResponse(res, {
      success: true,
      message: "Blood post accepted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createDonationCancelHistory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { postId } = req.body;
  // console.log(id, req.body);
  const result = await bloodPostService.saveDonationCancelHistoryIntoDb(
    id,
    postId
  );

  sendResponse(res, {
    success: true,
    message: "Blood event rejected successfully",
    data: result,
  });
};

export const bloodPostControllers = {
  createBloodPost,
  updateBloodPost,
  getAllBloodPosts,
  createDonationHistory,
  createDonationCancelHistory,
};
