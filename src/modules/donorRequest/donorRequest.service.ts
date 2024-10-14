import { ObjectId } from "mongodb";
import { TDonorRequest } from "./donorRequest.interface";
import { DonorRequest } from "./donorRequest.model";

const donorRequestSendToDatabase = async (payload: TDonorRequest) => {
  const result = await DonorRequest.create(payload);

  if (!result) {
    throw new Error("Failed to send request");
  }

  return result;
};

const getReceivedDonorRequest = async (id: string) => {
  const result = await DonorRequest.find({
    receiver: id,
  })
    .populate("post")
    .populate("sender", "name email");

  if (!result) {
    throw new Error("Failed to retrieved requests");
  }
  return result;
};

const updatePendingStatusToAccepted = async (id: string) => {
  const result = await DonorRequest.findByIdAndUpdate(
    id,
    { status: "accepted" },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new Error("Failed to retrieved requests");
  }
  return result;
};

export default {
  donorRequestSendToDatabase,
  getReceivedDonorRequest,
  updatePendingStatusToAccepted,
};
