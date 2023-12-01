import { ERROR_CODES } from '@shared/constants';
import { GraphQLBadRequestError } from '@shared/errors';

export class NotMatchingPasswordError extends GraphQLBadRequestError {
  constructor() {
    super(
      ERROR_CODES.NotMatchingPassword,
      'Password and repeat password are not matching',
    );
    this.name = 'NotMatchingPasswordError';
  }
}

export class InvalidCredentialsError extends GraphQLBadRequestError {
  constructor() {
    super(ERROR_CODES.InvalidCredentials, 'The credentials are invalid');
    this.name = 'InvalidCredentialsError';
  }
}
