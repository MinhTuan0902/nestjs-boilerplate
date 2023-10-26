import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '@shared/enums/error-code.enum';
import { GraphQLError } from 'graphql';

export class GraphQLBadRequestError extends GraphQLError {
  constructor(errorCode: ErrorCode, message: string) {
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
    super(ErrorCode.ValidationFailed, message);
    this.name = 'ValidationFailedError';
  }
}

export class GraphQLUnauthorizedError extends GraphQLError {
  constructor() {
    super('The request is unauthorized', {
      extensions: {
        code: HttpStatus.UNAUTHORIZED,
        status: 'UNAUTHORIZED',
        errorCode: ErrorCode.Unauthorized,
      },
    });
    this.name = 'GraphQLUnauthorizedError';
  }
}

export class GraphQLNotFoundError extends GraphQLError {
  constructor(errorCode: ErrorCode, message: string) {
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
        errorCode: ErrorCode.ForbiddenAction,
      },
    });
    this.name = 'GraphQLForbiddenActionError';
  }
}
