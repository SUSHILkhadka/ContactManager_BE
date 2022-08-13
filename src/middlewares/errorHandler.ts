import { NextFunction, Request, Response } from 'express';
import CustomError from './CustomError';

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500)
  res.json({
    message: err.message,
  });
};

export default errorHandler;
