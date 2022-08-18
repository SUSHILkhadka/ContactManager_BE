import multer from 'multer';
import logger from '../misc/Logger';

//local disk storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    if (file) {
    logger.info('uploading image to cloudinary');
      cb(null, `src/assets/uploads`);
    } else {
      cb('multer error');
    }
  },
  filename: function (req: any, file: any, cb: any) {
    if (file) {
      cb(null, Date.now() + '_' + file.originalname);
    } else {
      cb('multer error');
    }
  },
});

// const memStorage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;
