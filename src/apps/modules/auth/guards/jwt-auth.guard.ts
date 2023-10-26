import { UserRepository } from '@app/modules/users/repositories';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from '@shared/enums';
import { GraphQLUnauthorizedError } from '@shared/errors';
import { JWTData } from '../interfaces';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authHeader =
      ctx?.req?.headers?.authorization || ctx?.req?.headers?.Authorization;
    if (!authHeader) {
      throw new GraphQLUnauthorizedError();
    }

    const payload = await this.verifyAuthTokenFromHeader(authHeader);
    console.log(payload);
    const user = await this.userRepository.getById(payload.userId);
    if (!user) {
      throw new GraphQLUnauthorizedError();
    }

    ctx.req.user = user;

    return true;
  }

  async verifyAuthTokenFromHeader(authToken: string): Promise<JWTData> {
    try {
      const [bearer, token] = authToken.split(' ');
      if (bearer?.toLowerCase() !== 'bearer') {
        throw new GraphQLUnauthorizedError();
      }

      const payload: JWTData = this.jwtService.verify(token);
      if (payload.type !== TokenType.Access) {
        throw new GraphQLUnauthorizedError();
      }

      return payload;
    } catch (error) {
      console.error(error);
      throw new GraphQLUnauthorizedError();
    }
  }
}
