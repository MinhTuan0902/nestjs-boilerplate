import { registerEnumType } from '@nestjs/graphql';

export enum ErrorCode {
  ForbiddenAction = 'FORBIDDEN_ACTION',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  NotMatchingPassword = 'NOT_MATCHING_PASSWORD',
  TakenEmail = 'TAKEN_EMAIL',
  TakenUsername = 'TAKEN_USERNAME',
  Unauthorized = 'UNAUTHORIZED',
  UserNotFound = 'USER_NOT_FOUND',
  ValidationFailed = 'VALIDATION_FAILED',
}
registerEnumType(ErrorCode, { name: 'ErrorCode' });
