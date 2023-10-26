import { TakenUsernameError } from '@app/modules/auth/errors';
import { encryptPassword } from '@app/modules/auth/helpers';
import { Injectable } from '@nestjs/common';
import { User } from '@shared/models';
import { UserNotFoundError } from '../errors';
import { UserHelper } from '../helpers';
import { CreateUserInput, UpdateUserInput } from '../inputs';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userHelper: UserHelper,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { username, password } = createUserInput;
    if (await this.userHelper.isTakenUsername(username)) {
      throw new TakenUsernameError();
    }

    createUserInput.encryptedPassword = encryptPassword(password);
    return this.userRepository.create(createUserInput);
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<boolean> {
    const { userId, username, password } = updateUserInput;
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    if (
      username &&
      username !== user.username &&
      (await this.userHelper.isTakenUsername(username))
    ) {
      throw new TakenUsernameError();
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
