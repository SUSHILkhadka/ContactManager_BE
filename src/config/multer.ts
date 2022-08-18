import multer from 'multer';
import logger from '../misc/Logger';

//local disk storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    if (file) {
    logger.info('111111');
      cb(null, `src/assets/uploads`);
    } else {
    logger.info('1112');

      cb('multer error');
    }
  },
  filename: function (req: any, file: any, cb: any) {
    if (file) {
    logger.info('1113');

      cb(null, Date.now() + '_' + file.originalname);
    } else {
    logger.info('1114');
      cb('multer error');
    }
  },
});

// const memStorage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;
