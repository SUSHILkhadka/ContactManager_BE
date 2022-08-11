import { NextFunction, Request, Response } from 'express';

export const login = (req: Request, res: Response, next: NextFunction) => {
  console.log('before next, in logincontroller');
  // return next();
  console.log('after next, in logincontroller');
  // res.send('after next')
};
