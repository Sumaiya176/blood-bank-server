import { Types } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  age: number;
  location: string;
  lastDonationDate: string;
  donationAvailability: boolean;
  donationHistory: [Types.ObjectId];
  cancelHistory: [Types.ObjectId];
};
