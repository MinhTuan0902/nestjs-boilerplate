import { TokenRepository } from '@app/modules/tokens/repositories';
import { TakenUsernameError } from '@app/modules/users/errors';
import { UserHelper } from '@app/modules/users/helpers';
import { UserRepository } from '@app/modules/users/repositories';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT_NAMES } from '@shared/constants';
import { eTokenType } from '@shared/enums';
import { GraphQLUnauthorizedError } from '@shared/errors';
import { InvalidCredentialsError, NotMatchingPasswordError } from '../errors';
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
    private readonly eventEmitter: EventEmitter2,
    private readonly userHelper: UserHelper,
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
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

    this.eventEmitter.emitAsync(
      EVENT_NAMES.UserLoggedIn,
      newUser._id,
      authTokens.refresh,
    );

    return authTokens;
  }

  async manualLogin(manualLoginInput: ManualLoginInput): Promise<AuthTokens> {
    const { username, password } = manualLoginInput;
    const user = await this.userRepository.getByUsername(username);
    if (!user || !isMatchingPassword(password, user.encryptedPassword)) {
      throw new InvalidCredentialsError();
    }

    const authTokens = this.authTokenHelper.generateAuthTokens(user);

    this.eventEmitter.emitAsync(
      EVENT_NAMES.UserLoggedIn,
      user._id,
      authTokens.refresh,
    );

    return authTokens;
  }

  async getAuthTokens(refreshToken: string): Promise<AuthTokens> {
    const token = await this.tokenRepository.getByValue(refreshToken);
    if (
      !token ||
      token.expiresAt > new Date() ||
      token.type !== eTokenType.REFRESH
    ) {
      throw new GraphQLUnauthorizedError();
    }

    const user = await this.userRepository.getById(token.userId);
    if (!user) {
      throw new GraphQLUnauthorizedError();
    }

    const authTokens = this.authTokenHelper.generateAuthTokens(user);
    await this.tokenRepository.update(token._id, {
      value: authTokens.refresh.value,
    });

    return authTokens;
  }
}
