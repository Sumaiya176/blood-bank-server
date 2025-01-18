import { Types } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  age: number;
  district: string;
  lastDonationDate: string;
  donationAvailability: boolean;
  bloodGroup: string;
  points: number;
  donationHistory: [Types.ObjectId];
  postHistory: [Types.ObjectId];
  cancelHistory: [Types.ObjectId];
  friends: [Types.ObjectId];
};
