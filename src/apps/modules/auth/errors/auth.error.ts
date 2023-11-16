import { ERROR_CODES } from '@shared/constants';
import { GraphQLBadRequestError } from '@shared/errors';

export class TakenUsernameError extends GraphQLBadRequestError {
  constructor() {
    super(ERROR_CODES.TakenUsername, 'The username has been taken');
    this.name = 'TakenUsernameError';
  }
}

export class TakenEmailError extends GraphQLBadRequestError {
  constructor() {
    super(ERROR_CODES.TakenEmail, 'The email has been taken');
    this.name = 'TakenEmailError';
  }
}

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
