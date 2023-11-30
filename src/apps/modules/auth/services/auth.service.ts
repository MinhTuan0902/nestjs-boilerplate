import { TokenRepository } from '@app/modules/tokens/repositories';
import { UserHelper } from '@app/modules/users/helpers';
import { UserRepository } from '@app/modules/users/repositories';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EMAIL_TEMPLATE_PATHS, EVENT_NAMES } from '@shared/constants';
import { eTokenType } from '@shared/enums';
import { User } from '@shared/models';
import { SendEmailWorkerService } from '@worker/modules/send-email';
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
  VERIFICATION_EMAIL_TOKEN_TTL,
  encryptPassword,
  isMatchingPassword,
  makeVerificationEmailUrl,
} from '../helpers';
import { ManualLoginInput, ManualRegisterInput } from '../inputs';
import { AuthTokens } from '../types';

@Injectable()
export class AuthService {
  constructor(
    private readonly authTokenHelper: AuthTokenHelper,
    private readonly eventEmitter: EventEmitter2,
    private readonly tokenRepository: TokenRepository,
    private readonly userHelper: UserHelper,
    private readonly userRepository: UserRepository,
    private readonly sendEmailWorkerService: SendEmailWorkerService,
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

    // TODO: Save token
    this.eventEmitter.emitAsync(EVENT_NAMES.UserLoggedIn);

    return authTokens;
  }

  async manualLogin(manualLoginInput: ManualLoginInput): Promise<AuthTokens> {
    const { username, password } = manualLoginInput;
    const user = await this.userRepository.getByUsername(username);
    if (!user || !isMatchingPassword(password, user.encryptedPassword)) {
      throw new InvalidCredentialsError();
    }

    const authTokens = this.authTokenHelper.generateAuthTokens(user);

    // TODO: Save token
    this.eventEmitter.emitAsync(EVENT_NAMES.UserLoggedIn);

    return authTokens;
  }

  async updateEmail(currentUser: User, newEmail: string): Promise<boolean> {
    const { _id: userId, email: currentEmail } = currentUser;
    if (currentEmail === newEmail) return true;

    if (await this.userHelper.isTakenEmail(newEmail)) {
      throw new TakenEmailError();
    }

    const updateResult = await this.userRepository.update({
      userId: userId,
      email: newEmail,
      isVerifiedEmail: false,
    });
    if (updateResult) {
      this.eventEmitter.emitAsync(
        EVENT_NAMES.UserUpdatedEmail,
        currentUser,
        newEmail,
      );
    }

    return updateResult;
  }

  async makeVerificationEmail(currentUser: User): Promise<boolean> {
    const {
      _id: currentUserId,
      email,
      isVerifiedEmail,
      fullName,
    } = currentUser;
    if (!email || (email && isVerifiedEmail)) return false;

    const verificationToken = randomBytes(32).toString('hex');
    await this.tokenRepository.create({
      _id: new Types.ObjectId().toString(),
      userId: currentUserId,
      value: verificationToken,
      type: eTokenType.VERIFY,
      expiresAt: new Date(Date.now() + VERIFICATION_EMAIL_TOKEN_TTL),
    });

    const verificationUrl = makeVerificationEmailUrl(verificationToken);
    const sendEmailJob =
      await this.sendEmailWorkerService.addSendEmailJobToQueue({
        toEmail: email,
        templatePath: EMAIL_TEMPLATE_PATHS.Verify,
        variables: {
          fullName: fullName,
          verificationUrl: verificationUrl,
        },
      });
    if (!sendEmailJob) return false;

    return true;
  }

  async verifyEmail(request: Request, response: Response) {
    const tokenQueryParam = request.query.token as string;
    const tokenDocument =
      await this.tokenRepository.getByValue(tokenQueryParam);
    if (
      !tokenDocument ||
      tokenDocument.expiresAt < new Date() ||
      tokenDocument.revokedAt
    ) {
      return response.render('verify-email-failed.hbs');
    }

    const updateUserResult = await this.userRepository.update({
      userId: tokenDocument.userId,
      isVerifiedEmail: true,
    });
    const deleteTokenResult = await this.tokenRepository.deleteById(
      tokenDocument._id,
    );
    if (!updateUserResult || !deleteTokenResult) {
      return response.render('verify-email-failed.hbs');
    }

    return response.render('verify-email-success.hbs');
  }
}
