import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import CustomError from '../middlewares/CustomError';

/**
 * inputs: is input object which is to be validated
 * schema: is yup object schema with constraints for validation defined
 * throws error
 */
const Validator = (inputs: any, schema: yup.ObjectSchema<any>): string[] => {
  try {
    schema.validateSync(inputs, {
      abortEarly: false,
    });
    return [];
  } catch (err: any) {
    let allCombinedError = '';
    err.inner.forEach((error: any) => {
      allCombinedError += error.message + ', ';
    });
    throw new CustomError(allCombinedError, StatusCodes.BAD_REQUEST);
  }
};

export default Validator;
