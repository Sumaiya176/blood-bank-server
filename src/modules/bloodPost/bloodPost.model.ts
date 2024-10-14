import { Model, Schema, model } from "mongoose";
import { TBloodPost } from "./bloodPost.interface";

type bloodPostType = Model<TBloodPost, object>;

const bloodPostSchema = new Schema(
  {
    bloodGroup: {
      type: String,
      enum: ["A+", " A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    location: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    donar: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postCreator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const BloodPost = model<TBloodPost, bloodPostType>(
  "BloodPost",
  bloodPostSchema
);
