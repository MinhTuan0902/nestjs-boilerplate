import { Injectable } from '@nestjs/common';
import { User } from '@shared/models';
import { UserNotFoundError } from '../errors';
import { UserRepository } from '../repositories';

@Injectable()
export class UserHelperService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
