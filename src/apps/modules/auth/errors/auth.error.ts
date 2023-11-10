import { ErrorCode } from '@shared/enums';
import { GraphQLBadRequestError } from '@shared/errors';

export class TakenUsernameError extends GraphQLBadRequestError {
  constructor() {
    super(ErrorCode.TakenUsername, 'The username has been taken');
    this.name = 'TakenUsernameError';
  }
}

export class TakenEmailError extends GraphQLBadRequestError {
  constructor() {
    super(ErrorCode.TakenEmail, 'The email has been taken');
    this.name = 'TakenEmailError';
  }
}

export class NotMatchingPasswordError extends GraphQLBadRequestError {
  constructor() {
    super(
      ErrorCode.NotMatchingPassword,
      'Password and repeat password are not matching',
    );
    this.name = 'NotMatchingPasswordError';
  }
}

export class InvalidCredentialsError extends GraphQLBadRequestError {
  constructor() {
    super(ErrorCode.InvalidCredentials, 'The credentials are invalid');
    this.name = 'InvalidCredentialsError';
  }
}
