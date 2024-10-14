import { RequestHandler } from "express";
import { sendResponse } from "../../util/sendResponse";
import donarRequestService from "./donorRequest.service";

const createDonorRequest: RequestHandler = async (req, res, next) => {
  const { request } = req.body;
  //console.log(request);
  const result = await donarRequestService.donorRequestSendToDatabase(request);

  sendResponse(res, {
    success: true,
    message: "Request Sent successfully",
    data: result,
  });
};

const getReceivedDonorRequest: RequestHandler = async (req, res, next) => {
  const { userId } = req.query;
  console.log(userId);
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
  console.log(requestId);
  const result = await donarRequestService.updatePendingStatusToAccepted(
    requestId as string
  );

  sendResponse(res, {
    success: true,
    message: "Pending status updated successfully",
    data: result,
  });
};

export const donorRequestControllers = {
  createDonorRequest,
  getReceivedDonorRequest,
  updatePendingStatusToAccepted,
};
