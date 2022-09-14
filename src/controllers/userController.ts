import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import CustomError from '../middlewares/CustomError';
import * as UserService from '../services/userService';
import editUserSchema from '../validations/editUserSchema';
import registerSchema from '../validations/registerSchema';
import Validator from '../validations/Validator';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  Validator(req.body, registerSchema);

  if (!name || !email || !password) {
    throw new CustomError('name, email and password are required', StatusCodes.BAD_REQUEST);
  }
  UserService.createUser({ name, email, password })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getUserByEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError('email is required', StatusCodes.BAD_REQUEST);
  }
  UserService.getUserByEmail(email)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const updateUser = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { name, password, oldPassword } = req.body;
  const id = req.id;
  const email = req.email;
  Validator(req.body,editUserSchema)
  if (!id || !email) {
    return next(new CustomError('Invalid access token', StatusCodes.UNAUTHORIZED));
  }

  UserService.updateUser({ name, password, id, email }, oldPassword)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const deleteUser = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const id = req.id;
  if (!id) {
    return next(new CustomError('Invalid access token', StatusCodes.UNAUTHORIZED));
  }
  UserService.deleteUser(id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
