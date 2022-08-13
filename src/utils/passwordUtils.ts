import bcrypt from 'bcrypt';
import { SALT_ROUND } from '../constants/common';
export const generatePasswordHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUND);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};
