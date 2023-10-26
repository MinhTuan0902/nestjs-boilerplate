import { UserHelper } from '@app/modules/users/helpers';
import { UserRepository } from '@app/modules/users/repositories';
import { Injectable } from '@nestjs/common';
import {
  InvalidCredentialsError,
  NotMatchingPasswordError,
  TakenUsernameError,
} from '../errors';
import {
  AuthTokenHelper,
  encryptPassword,
  isMatchingPassword,
} from '../helpers';
import { ManualLoginInput, ManualRegisterInput } from '../inputs';
import { AuthTokens } from '../types';

@Injectable()
export class AuthService {
  constructor(
    private readonly authTokenHelper: AuthTokenHelper,
    private readonly userHelper: UserHelper,
    private readonly userRepository: UserRepository,
  ) {}

  async manualRegister(
    manualRegisterInput: ManualRegisterInput,
  ): Promise<AuthTokens> {
    const { username, password, repeatPassword } = manualRegisterInput;
    if (await this.userHelper.isTakenUsername(username)) {
      throw new TakenUsernameError();
    }

    if (password !== repeatPassword) {
      throw new NotMatchingPasswordError();
    }

    manualRegisterInput.encryptedPassword = encryptPassword(password);
    const newUser = await this.userRepository.create(manualRegisterInput);
    const authTokens = this.authTokenHelper.generateAuthTokens(newUser);
    return authTokens;
  }

  async manualLogin(manualLoginInput: ManualLoginInput): Promise<AuthTokens> {
    const { username, password } = manualLoginInput;
    const user = await this.userRepository.getByUsername(username);
    if (!user || !isMatchingPassword(password, user.encryptedPassword)) {
      throw new InvalidCredentialsError();
    }

    const authTokens = this.authTokenHelper.generateAuthTokens(user);
    return authTokens;
  }
}
