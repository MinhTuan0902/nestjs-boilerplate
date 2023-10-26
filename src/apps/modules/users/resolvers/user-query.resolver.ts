import { RequireAuth } from '@app/modules/auth/decorators';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '@shared/models';
import { ParseObjectIdPipe } from '@shared/pipes';
import { UserService } from '../services';

@Resolver()
export class UserQueryResolver {
  constructor(private readonly userService: UserService) {}

  @RequireAuth()
  @Query(() => User)
  async getUser(@Args('id', ParseObjectIdPipe) id: string): Promise<User> {
    return this.userService.getUser(id);
  }
}
