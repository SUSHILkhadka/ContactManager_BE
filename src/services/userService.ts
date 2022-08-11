import { SALT_ROUND } from '../constants/common';
import { ISuccess } from '../domains/ISuccess';
import { IUser, IUserToInsert } from '../domains/IUser';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import logger from '../misc/Logger';

export const createUser = async (userToInsert: IUserToInsert): Promise<ISuccess<IUser>> => {
  const { password } = userToInsert;
  const salt = await bcrypt.genSalt(SALT_ROUND);
  const passwordHash = await bcrypt.hash(password, salt);

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
  if (user) {
    logger.info('got user by email successfully =>userService.getUserByEmail');
    return {
      data: user,
      message: 'user by email fetched successfully',
    };
  } else {
    throw new Error('no email found');
  }
};
