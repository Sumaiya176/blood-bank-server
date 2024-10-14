import { Types } from "mongoose";

export type TBloodPost = {
  bloodGroup: "A+" | " A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  location: string;
  time: string;
  contact: string;
  patientName: string;
  note: string;
  donar: Types.ObjectId;
  postCreator: Types.ObjectId;
};
