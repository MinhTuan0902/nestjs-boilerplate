import { TakenEmailError, TakenUsernameError } from '@app/modules/auth/errors';
import { encryptPassword } from '@app/modules/auth/helpers';
import { Injectable } from '@nestjs/common';
import { User } from '@shared/models';
import { UserNotFoundError } from '../errors';
import { UserHelper } from '../helpers';
import { CreateUserInput, QueryUsersInput, UpdateUserInput } from '../inputs';
import { UserRepository } from '../repositories';
import { PaginatedUsers } from '../types';
import { UserHelperService } from './user-helper.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userHelperService: UserHelperService,
    private readonly userRepository: UserRepository,
    private readonly userHelper: UserHelper,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { username, email, password } = createUserInput;
    if (await this.userHelper.isTakenUsername(username)) {
      throw new TakenUsernameError();
    }

    if (email && (await this.userHelper.isTakenEmail(email))) {
      throw new TakenEmailError();
    }

    createUserInput.encryptedPassword = encryptPassword(password);
    return this.userRepository.create(createUserInput);
  }

  async getUser(id: string): Promise<User> {
    return this.userHelperService.getUserById(id);
  }

  async getUsers(queryUserInput: QueryUsersInput): Promise<PaginatedUsers> {
    const { filter, sortingOption, pageOption } = queryUserInput;
    const users = await this.userRepository.getByFilter(
      filter,
      sortingOption,
      pageOption,
    );
    const totalUsers = await this.userRepository.countByFilter(filter);

    return {
      items: users,
      totalItems: totalUsers,
      pageInfo: {
        hasPreviousPage: pageOption.limit > 1,
        hasNextPage: pageOption.limit + pageOption.skip < totalUsers,
      },
    };
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<boolean> {
    const { id, username, email, password } = updateUserInput;
    const user = await this.userHelperService.getUserById(id);

    if (
      username &&
      username !== user.username &&
      (await this.userHelper.isTakenUsername(username))
    ) {
      throw new TakenUsernameError();
    }

    if (
      email &&
      email !== user?.email &&
      (await this.userHelper.isTakenEmail(email))
    ) {
      throw new TakenEmailError();
    }

    if (password) {
      updateUserInput.encryptedPassword = encryptPassword(password);
    }

    return this.userRepository.update(updateUserInput);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new UserNotFoundError();
    }

    return this.userRepository.deleteById(id);
  }
}
