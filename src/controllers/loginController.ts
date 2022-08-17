import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../middlewares/CustomError';
import * as LoginService from '../services/LoginService';

/**
 * 
 * @param req request from user
 * @param res response after processing req
 * @param next next function
 */
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError('email and password is required', StatusCodes.BAD_REQUEST);
  }
  LoginService.login(email, password)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new CustomError('refreshToken is required', StatusCodes.BAD_REQUEST);
  }
  LoginService.getAccessToken(refreshToken)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new CustomError('refreshToken is required', StatusCodes.OK);
  }
  LoginService.logout(refreshToken)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
