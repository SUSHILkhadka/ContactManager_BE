import { NextFunction, Request, Response } from 'express';

/**
 * Middleware to handle invalid routes
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  console.log('ggg');
  throw error;
};
