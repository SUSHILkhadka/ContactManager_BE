import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { IDataAtToken } from '../domains/IDataAtToken';
import { IRequestWithTokenData } from '../domains/IRequestWithTokenData';
import CustomError from './CustomError';

const authenticate = async (req: IRequestWithTokenData, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    // throw new CustomError("need token",StatusCodes.FORBIDDEN);
    const err = new CustomError('need token in header', StatusCodes.UNAUTHORIZED);
    return next(err);
  }
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const dataAtToken = (await jwt.verify(accessToken, process.env.JWT_SECRET as string)) as IDataAtToken;
    req.id = dataAtToken.id;
    req.email = dataAtToken.email;
    return next();
  } catch {
    console.log('ff')
    const err = new CustomError('invalid access token', StatusCodes.FORBIDDEN);
    return next(err);
  }
};
export default authenticate;
