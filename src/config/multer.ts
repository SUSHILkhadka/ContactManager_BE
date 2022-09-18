import { Request } from "express";
import multer from "multer";
import logger from "../misc/Logger";

type DestinationCallback = (error: Error | any, destination: string) => void;
type FileNameCallback = (error: Error | any, filename: string) => void;
//local disk storage configuration for multer
const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    try {
      if (file) cb(null, `src/assets/uploads`);
      logger.info("setting up destination for file");
    } catch (e: Error | any) {
      logger.error("setting up destination for file,failed");
      cb(e, "multer error");
    }
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) {
    try {
      if (file) cb(null, Date.now() + "_" + file.originalname);
      logger.info("setting up filename for file");
    } catch (e: Error | any) {
      logger.info("setting up filename for file,failed");
      cb(e, "multer error");
    }
  },
});

// const memStorage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;
