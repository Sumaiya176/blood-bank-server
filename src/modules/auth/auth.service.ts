import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/AppError";
import { createToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {
  // -------------- checking user is exist or not ---------------
  const isUserExist = await User.findOne({ name: payload.name }).select(
    "+password"
  );
  if (!isUserExist) {
    throw new AppError(404, "User is not found");
  }

  //console.log("pass", isUserExist, payload?.password, isUserExist?.password);
  // -------------- password matching ---------------
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(401, "Wrong password");
  }

  // -------------- creating access and refresh token using jwt ---------------
  const user = {
    name: isUserExist.name,
    email: isUserExist.email,
    id: isUserExist._id,
  };

  const accessToken = createToken(
    user,
    config.jwt_access_secret as string,
    "10d"
  );

  const refreshToken = createToken(
    user,
    config.jwt_refresh_secret as string,
    "15s"
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  // ------------- checking whether token is sent or not -------------
  if (!token) {
    throw new AppError(401, "You are not authorized");
  }

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { name } = decoded;

  const isUserExist = await User.findOne({ name: name });
  if (!isUserExist) {
    throw new AppError(404, "User is not found");
  }

  // -------------- creating access token using jwt ---------------
  const user = {
    name: isUserExist.name,
    email: isUserExist.email,
    id: isUserExist._id,
  };

  const accessToken = createToken(
    user,
    config.jwt_access_secret as string,
    "10s"
  );

  return { accessToken };
};

const userNameChecking = async (payload: Partial<TLoginUser>) => {
  const similarUsers = await User.find({
    name: { $regex: `^${payload.name}`, $options: "i" },
  }).select("name");

  return similarUsers;
};

export const AuthServices = {
  loginUser,
  refreshToken,
  userNameChecking,
};
