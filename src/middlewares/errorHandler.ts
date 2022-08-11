import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.log('a = ',a);
  console.log('in errorhandlermiddleware');
  // res.send('in errorhandler')
  res.json({
    message: err.message,
  });
};

export default errorHandler;
