import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { IDataAtToken } from '../domains/IDataAtToken';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import CustomError from './CustomError';

const authenticate = async (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    const err = new CustomError('invalid access token', StatusCodes.UNAUTHORIZED);
    return next(err);
  }
  try {
  const accessToken = req.headers.authorization.split(' ')[1];
    const dataAtToken =  jwt.verify(accessToken, process.env.JWT_SECRET as string) as IDataAtToken;
    req.id = dataAtToken.id;
    req.email = dataAtToken.email;
    return next();
  } catch {
    const err = new CustomError('invalid access token', StatusCodes.UNAUTHORIZED);
    return next(err);
  }
};
export default authenticate;
