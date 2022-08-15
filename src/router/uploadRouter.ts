import { NextFunction, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../middlewares/CustomError';
import cloudinary from '../config/cloudinary';
import logger from '../misc/Logger';
import upload from '../config/multer';
import fs from 'fs';

const router = Router();
router.post('/', upload.array('keyForFileObject'), uploadFiles);

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
    const filePath = req.files[0].path;
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
