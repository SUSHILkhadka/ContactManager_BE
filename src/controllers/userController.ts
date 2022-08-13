import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import CustomError from '../middlewares/CustomError';
import * as UserService from '../services/userService';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

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

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  UserService.getAllUsers()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const updateUser = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const { name, password } = req.body;
  const id = req.id;
  const email = req.email;
  if (!id || !email) {
    return next(new CustomError('id and email in token for updating is required', StatusCodes.BAD_REQUEST));
  }

  UserService.updateUser({ name, password, id, email })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const deleteUser = (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  const id = req.id;
  if (!id) {
    return next(new CustomError('id in tokendata is required', StatusCodes.BAD_REQUEST));
  }
  UserService.deleteUser(id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
