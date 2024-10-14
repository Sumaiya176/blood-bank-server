import { User } from "../users/user.model";
import { TBloodPost } from "./bloodPost.interface";
import { BloodPost } from "./bloodPost.model";

const getAllBloodPosts = async () => {
  const result = await BloodPost.find();

  if (!result) {
    throw new Error("Failed to get all blood event posts");
  }

  return result;
};

const bloodPostSendToDatabase = async (payload: TBloodPost) => {
  const result = await BloodPost.create(payload);

  if (!result) {
    throw new Error("Failed to posting blood event");
  }

  return result;
};

const updateBloodPostToDatabase = async (
  id: string,
  payload: Partial<TBloodPost>
) => {
  console.log(payload);
  const result = await BloodPost.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new Error("Failed to update blood event post");
  }

  return result;
};
const saveDonationHistoryIntoDb = async (
  id: string,
  postId: { id: string }
) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      $push: { donationHistory: postId.id },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw new Error("Failed to add blood donation history");
  }

  return result;
};

export default {
  getAllBloodPosts,
  bloodPostSendToDatabase,
  updateBloodPostToDatabase,
  saveDonationHistoryIntoDb,
};
