import AppError from "../../errors/AppError";
import { BloodPost } from "../bloodPost/bloodPost.model";
import { DonorRequest } from "../donorRequest/donorRequest.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const getAllActiveUsers = async () => {
  const result = await User.find({ donationAvailability: true });

  if (!result) {
    throw new Error("Failed to retrieve all active users");
  }

  return result;
};

const getAllUsers = async (payload: string) => {
  const specificUser = await User.find({ name: payload });
  //console.log(specificUser[0]);
  const allUsers = await User.find();
  const usersWithoutConnectors = allUsers.filter(
    (user) => !specificUser[0]?.friends?.includes(user?._id)
  );

  if (!usersWithoutConnectors) {
    throw new Error("Failed to retrieve all users");
  }

  return usersWithoutConnectors;
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

const updateUserRegistration = async (id: string, user: Partial<TUser>) => {
  // console.log(id, user);
  const result = await User.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new Error("Failed to update user profile");
  }

  return result;
};

const getMyPost = async (uName: string) => {
  const result = await User.findOne({ name: uName }).populate({
    path: "postHistory",
    populate: {
      path: "donarRequest",
      model: "DonorRequest",
    },
  });
  // const result = await User.findOne({ name: uName })
  //   .populate("postHistory")
  //   .populate("donorRequest");

  if (!result) {
    throw new Error("Failed to retrieved my posts");
  }

  return result;
};

const getRequestedDonor = async (id: string) => {
  //console.log(id);
  const result = await BloodPost.findById(id).populate({
    path: "donarRequest",
    populate: {
      path: "receiver",
      model: "User",
    },
  });

  if (!result) {
    throw new Error("Failed to retrieved requested donor");
  }

  return result;
};

const getMyDonationHistory = async (uName: string) => {
  const result = await User.findOne({ name: uName }).populate({
    path: "donationHistory",
    model: DonorRequest,
    populate: {
      path: "post",
      model: BloodPost,
    },
  });

  console.log("jgjhgjhkj", uName, result);

  if (!result) {
    throw new Error("Failed to retrieved my posts");
  }

  return result;
};

const makeConnection = async (payload: { name: string; id: string }) => {
  const result = await User.findOneAndUpdate(
    { name: payload.name },
    {
      $addToSet: { friends: payload.id },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw new Error("Failed to create connection");
  }

  return result;
};

const connectedUsers = async (name: string) => {
  const result = await User.find({ name: name }).populate("friends");
  //console.log("connected-user", result);

  if (!result) {
    throw new Error("Failed to find connected users");
  }

  return result;
};

const pointReduction = async (name: string, postId: string, userId: string) => {
  const result = await User.updateOne(
    { name: name, points: { $gte: 1 } },
    {
      $inc: { points: -1 },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  //console.log("result", result, id);

  const numberOpened = {
    user: userId,
    phoneStatus: true,
  };
  const openMobileNumber = await BloodPost.findByIdAndUpdate(
    postId,
    {
      $push: { phoneNumberOpened: numberOpened },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  //console.log(openMobileNumber);

  if (!result) {
    throw new Error("Failed to reduce points from user");
  } else if (result.modifiedCount === 0) {
    throw new AppError(200, "You have 0 points");
  }

  return result;
};

export default {
  createUserRegistration,
  updateUserRegistration,
  getAllActiveUsers,
  getAllUsersWithDonationHistory,
  getSingleUser,
  getMyPost,
  getMyDonationHistory,
  getAllUsers,
  makeConnection,
  connectedUsers,
  pointReduction,
  getRequestedDonor,
};
