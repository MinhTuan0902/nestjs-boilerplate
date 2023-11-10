import { TokenRepository } from '@app/modules/tokens/repositories';
import { UserHelper } from '@app/modules/users/helpers';
import { UserRepository } from '@app/modules/users/repositories';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventName, TokenType } from '@shared/enums';
import { User } from '@shared/models';
import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import {
  InvalidCredentialsError,
  NotMatchingPasswordError,
  TakenEmailError,
  TakenUsernameError,
} from '../errors';
import {
  AuthTokenHelper,
  encryptPassword,
  isMatchingPassword,
} from '../helpers';
import { ManualLoginInput, ManualRegisterInput } from '../inputs';
import { AuthTokens } from '../types';

const VERIFICATION_EMAIL_TOKEN_TTL = 5 * 60 * 1000; // 5 minutes

@Injectable()
export class AuthService {
  constructor(
    private readonly authTokenHelper: AuthTokenHelper,
    private readonly eventEmitter: EventEmitter2,
    private readonly tokenRepository: TokenRepository,
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

    this.eventEmitter.emitAsync(EventName.UserLoggedIn);

    return authTokens;
  }

  async manualLogin(manualLoginInput: ManualLoginInput): Promise<AuthTokens> {
    const { username, password } = manualLoginInput;
    const user = await this.userRepository.getByUsername(username);
    if (!user || !isMatchingPassword(password, user.encryptedPassword)) {
      throw new InvalidCredentialsError();
    }

    const authTokens = this.authTokenHelper.generateAuthTokens(user);

    this.eventEmitter.emitAsync(EventName.UserLoggedIn);

    return authTokens;
  }

  async updateEmail(currentUser: User, newEmail: string): Promise<boolean> {
    const { _id: userId, email: currentEmail } = currentUser;
    if (currentEmail === newEmail) {
      return true;
    }

    if (await this.userHelper.isTakenEmail(newEmail)) {
      throw new TakenEmailError();
    }

    const updateResult = await this.userRepository.update({
      id: userId,
      email: newEmail,
      isVerifiedEmail: false,
    });
    if (updateResult) {
      this.eventEmitter.emitAsync(EventName.UserUpdatedEmail, userId, newEmail);
    }

    return updateResult;
  }

  async makeVerificationEmail(currentUser: User): Promise<boolean> {
    const { _id: currentUserId, email, isVerifiedEmail } = currentUser;
    if (!email || (email && isVerifiedEmail)) return false;

    const verificationToken = randomBytes(32).toString('hex');
    await this.tokenRepository.create({
      _id: new Types.ObjectId().toString(),
      userId: currentUserId,
      value: verificationToken,
      type: TokenType.Verify,
      expiresAt: new Date(Date.now() + VERIFICATION_EMAIL_TOKEN_TTL),
    });
    // TODO: Make and send verification email

    // NOTE: That an example of verification URL
    const url = `http://localhost:3000/auth/verify_email?token=${verificationToken}`;

    return true;
  }

  async verifyEmail(request: Request, response: Response) {
    const token = request.query.token as string;
    const tokenDocument = await this.tokenRepository.getByValue(token);
    if (
      !tokenDocument ||
      tokenDocument.expiresAt < new Date() ||
      tokenDocument.revokedAt
    ) {
      // response.redirect('/');
      response.render('verify-email-failed.hbs');
      return;
    }
  }
}
