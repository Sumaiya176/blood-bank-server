import { TUser } from "./user.interface";
import { User } from "./user.model";

const getAllActiveUsers = async () => {
  const result = await User.find({ donationAvailability: true });

  if (!result) {
    throw new Error("Failed to retrieve all active users");
  }

  return result;
};

const getAllUsersWithDonationHistory = async () => {
  const result = await User.find().populate({
    path: "donationHistory",
    strictPopulate: false,
  });

  if (!result) {
    throw new Error("Failed to retrieve all active users");
  }

  return result;
};

const getSingleUser = async (name: string) => {
  const result = await User.find({ name });

  if (!result) {
    throw new Error("Failed to retrieve single user");
  }

  return result;
};

const createUserRegistration = async (payload: TUser) => {
  const isUserAlreadyExist = await User.findOne({ name: payload.name });
  if (isUserAlreadyExist) {
    throw new Error("User is already exists");
  }

  const result = await User.create(payload);

  if (!result) {
    throw new Error("Failed to register new user");
  }

  return result;
};

const updateUserRegistration = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new Error("Failed to update user profile");
  }

  return result;
};

export default {
  createUserRegistration,
  updateUserRegistration,
  getAllActiveUsers,
  getAllUsersWithDonationHistory,
  getSingleUser,
};
