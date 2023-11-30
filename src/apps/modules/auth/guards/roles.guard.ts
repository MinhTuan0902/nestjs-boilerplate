import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { eUserRole } from '@shared/enums';
import { GraphQLForbiddenActionError } from '@shared/errors';
import { User } from '@shared/models';
import { ROLE_KEY } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Array<eUserRole>>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || !requiredRoles.length) return true;

    const user = GqlExecutionContext.create(context).getContext()?.req
      ?.user as User;
    if (!requiredRoles.includes(user.role)) {
      throw new GraphQLForbiddenActionError();
    }

    return true;
  }
}
