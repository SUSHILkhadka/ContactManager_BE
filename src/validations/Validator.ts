import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import CustomError from "../middlewares/CustomError";
const Validator = (inputs: any, schema: yup.ObjectSchema<any>): string[] => {
  try {
    schema.validateSync(inputs, {
      abortEarly: false,
    });
    return [];
  } catch (err: any) {
    let allCombinedError: string = "";
    err.inner.forEach((error: any) => {
      allCombinedError += error.message + ", ";
    });
    throw new CustomError(allCombinedError, StatusCodes.BAD_REQUEST);
  }
};

export default Validator;
