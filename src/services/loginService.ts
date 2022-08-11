import StatusCodes from "http-status-codes";
import UserModel from "../models/userModel";
import CustomError from "../middlewares/CustomError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EXPIRY_TIME, EXPIRY_TIME_REFRESH_TOKEN } from "../constants/common";
import dotenv from "dotenv";
import { ITokens } from "../domains/ITokens";
import User from "../models/userModel";
import RefreshTokenModel from "../models/refreshTokenModel";
import IRefreshToken from "../domains/IRefreshToken";
import { IDataAtToken } from "../domains/IDataAtToken";
dotenv.config();

export const login = async (
  email: string,
  password: string
): Promise<ITokens<User>> => {
  const user = await UserModel.getUserByEmail(email);
  if (!user) {
    throw new CustomError("no email found", StatusCodes.BAD_REQUEST);
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new CustomError("wrong password", StatusCodes.BAD_REQUEST);
  }

  //valid user
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: EXPIRY_TIME }
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_TOKEN_SECRET as string
  );

  await RefreshTokenModel.createRefreshToken({
    refreshToken,
    id: user.id,
    expiresAt: new Date(Date.now() + EXPIRY_TIME_REFRESH_TOKEN),
  });
  return {
    data: user,
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresAt: EXPIRY_TIME,
    message: "login successfully",
  };
};

export const getAccessToken = async (
  refreshToken: string
): Promise<ITokens<IRefreshToken>> => {
  const refreshTokenFromDb = (await RefreshTokenModel.getRefreshTokenByToken(
    refreshToken
  )) as IRefreshToken;
  if (!refreshTokenFromDb) {
    throw new CustomError(
      "invalid refresh token. Getting new accessToken failed",
      StatusCodes.FORBIDDEN
    );
  }
  if (refreshTokenFromDb.expiresAt < new Date(Date.now())) {
    throw new CustomError(
      "refresh token already expired. Getting new accessToken failed",
      StatusCodes.FORBIDDEN
    );
  }

  try {
    const dataAtToken = (await jwt.verify(
      refreshToken as string,
      process.env.JWT_TOKEN_SECRET as string
    )) as IDataAtToken;
    console.log("data from refresh token = ", dataAtToken);
    const { id, email } = dataAtToken;
    const newAccessToken = jwt.sign(
      { id, email },
      process.env.JWT_SECRET as string,
      { expiresIn: EXPIRY_TIME }
    );
    return {
      data: refreshTokenFromDb,
      accessToken: newAccessToken,
      expiresAt: EXPIRY_TIME,
      message: "got new accessToken successfully",
    };
  } catch {
    throw new CustomError(
      "invalid refresh token although it existed in database. So fetching new accessToken failed"
    );
  }
};

export const logout = async (
  refreshToken: string
): Promise<ITokens<IRefreshToken[]>> => {
  const remainingTokens = await RefreshTokenModel.deleteRefreshTokenByToken(
    refreshToken
  );
  return {
    data: remainingTokens,
    message: "deleted above refresh token successfully",
  };
};

export const getAllRefreshTokens = async (): Promise<
  ITokens<IRefreshToken[]>
> => {
  const tokens = await RefreshTokenModel.getAllRefreshTokens();
  return {
    data: tokens,
    message: "all refresh tokens fetches sucessfully",
  };
};
