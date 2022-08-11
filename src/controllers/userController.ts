import { NextFunction, Request, Response } from 'express';
import * as UserService from '../services/userService';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  UserService.createUser({ name, email, password })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getUserByEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  UserService.getUserByEmail(email)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
export const updateUser = (req: Request, res: Response, next: NextFunction) => {};
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {};
