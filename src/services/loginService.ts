import StatusCodes from 'http-status-codes';
import UserModel from '../models/userModel';
import CustomError from '../middlewares/CustomError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { EXPIRY_TIME, EXPIRY_TIME_REFRESH_TOKEN } from '../constants/common';
import dotenv from 'dotenv';
import { ITokens } from '../domains/ITokens';
import User from '../models/userModel';
import RefreshTokenModel from '../models/refreshTokenModel';
import IRefreshToken from '../domains/IRefreshToken';
import { IDataAtToken } from '../domains/IDataAtToken';


dotenv.config();

/**
 * 
 * @param email valid email as string
 * @param password valid password as string
 * @returns compares password hash and given password, if correct, returns access token and refresh token
 */
export const login = async (email: string, password: string): Promise<ITokens<User>> => {
  const user = await UserModel.getUserByEmail(email);
  if (!user) {
    throw new CustomError('no email found', StatusCodes.BAD_REQUEST);
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new CustomError('wrong password', StatusCodes.UNAUTHORIZED);
  }

  //valid user
  const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: EXPIRY_TIME,
  });
  const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_TOKEN_SECRET as string);

  //adding new refresh token to database
  await RefreshTokenModel.createRefreshToken({
    refreshToken,
    id: user.id,
    expiresAt: Date.now() + EXPIRY_TIME_REFRESH_TOKEN,
  });
  return {
    data: user,
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresAt: EXPIRY_TIME,
    expiresAtRefreshToken: Date.now()+EXPIRY_TIME_REFRESH_TOKEN,
    message: 'login successfully',
  };
};


/**
 * 
 * @param refreshToken valid refreshtoken for getting new accesstoken after access toekn is expired
 * @returns new access token with new expiry time
 */

export const getAccessToken = async (refreshToken: string): Promise<ITokens<IRefreshToken>> => {
  const refreshTokenFromDb = (await RefreshTokenModel.getRefreshTokenByToken(refreshToken)) as IRefreshToken;
  if (!refreshTokenFromDb || (+refreshTokenFromDb.expiresAt < Date.now())) {
     await RefreshTokenModel.deleteRefreshTokenByToken(refreshToken)
    throw new CustomError('refresh token already expired.', StatusCodes.UNAUTHORIZED);
  }

  try {
    const dataAtToken = (await jwt.verify(refreshToken, process.env.JWT_TOKEN_SECRET as string)) as IDataAtToken;
    const { id, email } = dataAtToken;
    const newAccessToken = jwt.sign({ id, email }, process.env.JWT_SECRET as string, { expiresIn: EXPIRY_TIME });
    return {
      data: refreshTokenFromDb,
      accessToken: newAccessToken,
      expiresAt: EXPIRY_TIME,
      message: 'got new accessToken successfully',
    };
  } catch {
    throw new CustomError('invalid refresh token although it existed in database. So fetching new accessToken failed');
  }
};


/**
 * 
 * @param refreshToken current refresh token as string
 * @returns deletes refresh token from database and return deleted token
 */
export const logout = async (refreshToken: string): Promise<ITokens<IRefreshToken>> => {
  const deletedToken = await RefreshTokenModel.deleteRefreshTokenByToken(refreshToken);
  return {
    data: deletedToken,
    message: 'deleted above refresh token successfully',
  };
};
