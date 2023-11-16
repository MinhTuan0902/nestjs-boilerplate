import { ERROR_CODES } from '@shared/constants';
import { GraphQLNotFoundError } from '@shared/errors';

export class UserNotFoundError extends GraphQLNotFoundError {
  constructor() {
    super(ERROR_CODES.UserNotFound, 'The user is not found');
    this.name = 'UserNotFoundError';
  }
}
