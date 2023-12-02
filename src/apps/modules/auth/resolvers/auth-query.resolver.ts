import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '@shared/models';
import { CurrentUser, RequireAuth } from '../decorators';
import { AuthService } from '../services';
import { AuthTokens } from '../types';

@Resolver()
export class AuthQueryResolver {
  constructor(private readonly authService: AuthService) {}

  @RequireAuth()
  @Query(() => User)
  async getMySelf(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser;
  }

  @Query(() => AuthTokens)
  async getAuthTokens(
    @Args('refreshToken') refreshToken: string,
  ): Promise<AuthTokens> {
    return this.authService.getAuthTokens(refreshToken);
  }
}
