import { NextFunction, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../middlewares/CustomError';
import cloudinary from '../config/cloudinary';
import logger from '../misc/Logger';
import upload from '../config/multer';
import fs from 'fs';

const router = Router();

/**
 * request has data in multipart/form data form
 * multer's upload.array middleware combines these into single file in server's disk or memory storage.
 * after new file is formed locally, uploadfiles then uploads this whole file to cloud.
 */
router.post('/', upload.array('keyForFileObject'), uploadFiles);

/**
 * 
 * @param req user's request with files
 * @param res response of server
 * @param next next function
 * @returns url of file after uploading to cloud and deleting local file.
 */
async function uploadFiles(req: any, res: Response, next: NextFunction) {
  try {
    logger.info('uploading image to cloudinary');

    //for multiple files
    // req.files.forEach(async (element:any) => {
    //   const uploadResponse=await cloudinary.uploader.upload(element.path,{
    //     upload_preset: 'contacts-photo'
    //   });
    //   logger.info("successfully uploaded image to cloudinary");
    // console.log('url = ',uploadResponse.url)
    // });

    // for single file
    const filePath = req.files.path;
    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      upload_preset: 'contacts-photo',
    });
    logger.info('successfully uploaded image to cloudinary');
    console.log('url = ', uploadResponse.url);
    fs.unlinkSync(filePath);
    return res.json({ url: uploadResponse.url });
  } catch (e) {
    fs.unlinkSync(req.files[0].path);
    return next(new CustomError(`${e}`, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

export default router;
