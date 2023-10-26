import { applyDecorators } from '@nestjs/common';
import { Matches } from 'class-validator';

export const IsValidPassword = () => {
  return applyDecorators();
  // Define your password RegExp here
  // Matches()
};
