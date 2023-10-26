import { ErrorCode } from '@shared/enums';
import { GraphQLNotFoundError } from '@shared/errors';

export class UserNotFoundError extends GraphQLNotFoundError {
  constructor() {
    super(ErrorCode.UserNotFound, 'The user is not found');
    this.name = 'UserNotFoundError';
  }
}
