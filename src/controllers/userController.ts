import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../middlewares/CustomError';
import * as UserService from '../services/userService';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password){
    throw new CustomError(
        "name, email and password are required",
        StatusCodes.BAD_REQUEST
      );
  }
  UserService.createUser({ name, email, password })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getUserByEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if(!email){
    throw new CustomError("email is required",StatusCodes.BAD_REQUEST);
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
export const updateUser = (req: Request, res: Response, next: NextFunction) => {};
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {};

