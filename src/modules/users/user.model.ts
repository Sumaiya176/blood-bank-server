import { Model, Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

type UserModel = Model<TUser, object>;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    age: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    lastDonationDate: {
      type: String,
    },
    donationAvailability: {
      type: Boolean,
      required: true,
      default: true,
    },
    donationHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "BloodPost",
      },
    ],
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
});

export const User = model<TUser, UserModel>("User", userSchema);
