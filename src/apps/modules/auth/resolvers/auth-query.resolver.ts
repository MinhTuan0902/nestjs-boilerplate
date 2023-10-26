import { Query, Resolver } from '@nestjs/graphql';
import { User } from '@shared/models';
import { CurrentUser, RequireAuth } from '../decorators';

@Resolver()
export class AuthQueryResolver {
  @RequireAuth()
  @Query(() => User)
  async getMySelf(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser;
  }
}
