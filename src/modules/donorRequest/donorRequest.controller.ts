import { RequestHandler } from "express";
import { sendResponse } from "../../util/sendResponse";
import donarRequestService from "./donorRequest.service";

const createDonorRequest: RequestHandler = async (req, res, next) => {
  try {
    const { request } = req.body;

    const result = await donarRequestService.donorRequestSendToDatabase(
      request
    );

    sendResponse(res, {
      success: true,
      message: "Request sent successfully",
      data: result,
    });
  } catch (error) {
    next(error); // Forward the error to the global error handler middleware
  }
};

const getReceivedDonorRequest: RequestHandler = async (req, res, next) => {
  const { userId } = req.query;
  //console.log(userId);
  const result = await donarRequestService.getReceivedDonorRequest(
    userId as string
  );

  sendResponse(res, {
    success: true,
    message: "Requests retrieved successfully",
    data: result,
  });
};

const updatePendingStatusToAccepted: RequestHandler = async (
  req,
  res,
  next
) => {
  const { requestId } = req.query;
  //(requestId);
  const result = await donarRequestService.updatePendingStatusToAccepted(
    requestId as string
  );

  sendResponse(res, {
    success: true,
    message: "Pending status updated successfully",
    data: result,
  });
};

const updatePendingStatusToRejected: RequestHandler = async (
  req,
  res,
  next
) => {
  const { requestId } = req.query;
  //console.log(requestId);
  const result = await donarRequestService.updatePendingStatusToRejected(
    requestId as string
  );

  sendResponse(res, {
    success: true,
    message: "Pending status updated successfully",
    data: result,
  });
};

const changeDonarRequestStatus: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await donarRequestService.changeDonarRequestStatus(
      id as string,
      status
    );

    sendResponse(res, {
      success: true,
      message: "Changed donar request status successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const donorRequestControllers = {
  createDonorRequest,
  getReceivedDonorRequest,
  updatePendingStatusToAccepted,
  updatePendingStatusToRejected,
  changeDonarRequestStatus,
};
