import { HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '@shared/constants';
import { GraphQLError } from 'graphql';

export class GraphQLBadRequestError extends GraphQLError {
  constructor(errorCode: string, message: string) {
    super(message, {
      extensions: {
        code: HttpStatus.BAD_REQUEST,
        status: 'BAD_REQUEST',
        errorCode: errorCode,
      },
    });
  }
}

export class ValidationFailedError extends GraphQLBadRequestError {
  constructor(message: string) {
    super(ERROR_CODES.ValidationFailed, message);
    this.name = 'ValidationFailedError';
  }
}

export class GraphQLUnauthorizedError extends GraphQLError {
  constructor() {
    super('The request is unauthorized', {
      extensions: {
        code: HttpStatus.UNAUTHORIZED,
        status: 'UNAUTHORIZED',
        errorCode: ERROR_CODES.Unauthorized,
      },
    });
    this.name = 'GraphQLUnauthorizedError';
  }
}

export class GraphQLNotFoundError extends GraphQLError {
  constructor(errorCode: string, message: string) {
    super(message, {
      extensions: {
        code: HttpStatus.NOT_FOUND,
        status: 'NOT_FOUND',
        errorCode: errorCode,
      },
    });
  }
}

export class GraphQLForbiddenActionError extends GraphQLError {
  constructor() {
    super('You are not allowed to do this action', {
      extensions: {
        code: HttpStatus.FORBIDDEN,
        status: 'FORBIDDEN',
        errorCode: ERROR_CODES.ForbiddenAction,
      },
    });
    this.name = 'GraphQLForbiddenActionError';
  }
}
