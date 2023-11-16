import {
  CurrentUser,
  RequireAuth,
  RequireRoles,
} from '@app/modules/auth/decorators';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserRole } from '@shared/enums';
import { User } from '@shared/models';
import { ParseObjectIdPipe } from '@shared/pipes';
import { CreateUserInput, UpdateUserInput } from '../inputs';
import { UserService } from '../services';

@Resolver()
export class UserMutationResolver {
  constructor(private readonly userService: UserService) {}

  // NOTE: Guard ở gần với controller/resolver hơn thì chạy trước
  @RequireRoles(UserRole.Admin)
  @RequireAuth()
  @Mutation(() => User)
  async createUser(
    @CurrentUser() { _id: currentUserId }: User,
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser({
      ...createUserInput,
      creatorId: currentUserId,
    });
  }

  @RequireRoles(UserRole.Admin)
  @RequireAuth()
  @Mutation(() => Boolean)
  async updateUser(
    @CurrentUser() { _id: currentUserId }: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<boolean> {
    if (currentUserId.toString() === updateUserInput.userId) {
      return false;
    }

    return this.userService.updateUser({
      ...updateUserInput,
      updaterId: currentUserId,
    });
  }

  @RequireRoles(UserRole.Admin)
  @RequireAuth()
  @Mutation(() => Boolean)
  async deleteUser(
    @CurrentUser() { _id: currentUserId }: User,
    @Args('id', ParseObjectIdPipe) id: string,
  ): Promise<boolean> {
    if (currentUserId.toString() === id) {
      return false;
    }

    return this.userService.deleteUser(id);
  }
}
