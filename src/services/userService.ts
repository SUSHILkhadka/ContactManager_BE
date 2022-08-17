import StatusCodes from 'http-status-codes';
import { ISuccess } from '../domains/ISuccess';
import { IUser, IUserToInsert } from '../domains/IUser';
import UserModel from '../models/userModel';
import logger from '../misc/Logger';
import CustomError from '../middlewares/CustomError';
import { generatePasswordHash } from '../utils/passwordUtils';
import bcrypt from 'bcrypt';

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
  if (!user) {
    throw new CustomError("user account doesn't exists", StatusCodes.NOT_FOUND);
  }
  logger.info('got user by email successfully =>userService.getUserByEmail');
  return {
    data: user,
    message: 'user by email fetched successfully',
  };
};


export const updateUser = async (user: IUser, oldPassword: string): Promise<ISuccess<IUser>> => {
  const userForCheck = await UserModel.getUserByEmail(user.email);
  const isPasswordMatch = await bcrypt.compare(oldPassword, userForCheck.password);
  if (!isPasswordMatch) {
    throw new CustomError('wrong password', StatusCodes.UNAUTHORIZED);
  }
  //entered correct old password for changing name or password or both

  const password = user.password;
  const passwordHash = await generatePasswordHash(password);
  logger.info('updating user =>userService.updateUser');
  const updatedUser = await UserModel.updateUser({ ...user, password: passwordHash });
  logger.info('updated user successfully =>userService.updateUser');

  return {
    data: updatedUser,
    message: 'user updated successfully',
  };
};

export const deleteUser = async (id: number): Promise<ISuccess<IUser>> => {
  logger.info('deleting user =>userService.deleteUser');
  const deletedUser = await UserModel.deleteUser(id);
  logger.info('deleted user successfully =>userService.deleteUser');

  return {
    data: deletedUser,
    message: 'user by id deleted successfully',
  };
};
