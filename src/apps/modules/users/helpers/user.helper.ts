import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/modules/users/repositories';

@Injectable()
export class UserHelper {
  constructor(private readonly userRepository: UserRepository) {}

  async isTakenUsername(username: string): Promise<boolean> {
    return !!(await this.userRepository.getByUsername(username));
  }

  async isTakenEmail(email: string): Promise<boolean> {
    return !!(await this.userRepository.getByEmail(email));
  }
}
