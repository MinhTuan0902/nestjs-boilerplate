import { hashSync, compareSync } from 'bcrypt';

export const encryptPassword = (password: string): string => {
  return hashSync(password, 10);
};

export const isMatchingPassword = (
  password: string,
  encryptedPassword: string,
): boolean => {
  return compareSync(password, encryptedPassword);
};
