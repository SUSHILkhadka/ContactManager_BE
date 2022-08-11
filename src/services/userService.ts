import StatusCodes from "http-status-codes";
import { ISuccess } from '../domains/ISuccess';
import { IUser, IUserToInsert } from '../domains/IUser';
import UserModel from '../models/userModel';
import logger from '../misc/Logger';
import CustomError from '../middlewares/CustomError';
import { generatePasswordHash } from "../utils/passwordUtils";

export const createUser = async (userToInsert: IUserToInsert): Promise<ISuccess<IUser>> => {
  const { password } = userToInsert;
  const passwordHash = await generatePasswordHash(password);

  logger.info('creating user =>userService.createUser');
  const user = await UserModel.createUser({
    ...userToInsert,
    password: passwordHash,
  });
  logger.info('created user successfully =>userService.createUser');

  return {
    data: user,
    message: 'user by email fetched successfully',
  };
};
export const getUserByEmail = async (email: string): Promise<ISuccess<IUser>> => {
  logger.info('getting user by email =>userService.getUserByEmail');
  const user = await UserModel.getUserByEmail(email);
  if(!user){
    throw new CustomError("user account doesn't exists",StatusCodes.NOT_FOUND)
  }
    logger.info('got user by email successfully =>userService.getUserByEmail');
    return {
      data: user,
      message: 'user by email fetched successfully',
    };
};

export const getAllUsers = async (): Promise<ISuccess<IUser>> => {
  logger.info('getting user by email =>userService.getUserByEmail');
  const user = await UserModel.getAllUsers();
  if(!user){
    throw new CustomError("user account doesn't exists",StatusCodes.NOT_FOUND)
  }
    logger.info('got user by email successfully =>userService.getUserByEmail');
    return {
      data: user,
      message: 'user by email fetched successfully',
    };
};