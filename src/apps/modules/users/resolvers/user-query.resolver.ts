import { RequireAuth, RequireRoles } from '@app/modules/auth/decorators';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@shared/enums';
import { User } from '@shared/models';
import { ParseObjectIdPipe } from '@shared/pipes';
import { QueryUsersInput } from '../inputs';
import { UserService } from '../services';
import { PaginatedUsers } from '../types';

@Resolver()
export class UserQueryResolver {
  constructor(private readonly userService: UserService) {}

  @RequireAuth()
  @Query(() => User)
  async getUser(@Args('id', ParseObjectIdPipe) id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @RequireRoles(UserRole.Admin)
  @RequireAuth()
  @Query(() => PaginatedUsers)
  async getUsers(
    @Args('queryUsersInput') queryUsersInput: QueryUsersInput,
  ): Promise<PaginatedUsers> {
    return this.userService.getUsers(queryUsersInput);
  }
}
