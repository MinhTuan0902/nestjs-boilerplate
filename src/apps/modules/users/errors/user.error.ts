import { ERROR_CODES } from '@shared/constants';
import { GraphQLBadRequestError, GraphQLNotFoundError } from '@shared/errors';

export class TakenUsernameError extends GraphQLBadRequestError {
  constructor() {
    super(ERROR_CODES.TakenUsername, 'The username has been taken');
    this.name = 'TakenUsernameError';
  }
}

export class UserNotFoundError extends GraphQLNotFoundError {
  constructor() {
    super(ERROR_CODES.UserNotFound, 'The user is not found');
    this.name = 'UserNotFoundError';
  }
}
