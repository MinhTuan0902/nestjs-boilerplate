import { TokenRepository } from '@app/modules/tokens/repositories';
import { UserRepository } from '@app/modules/users/repositories';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EMAIL_TEMPLATE_PATHS, EVENT_NAMES } from '@shared/constants';
import { TokenType } from '@shared/enums';
import { User } from '@shared/models';
import { SendEmailWorkerService } from '@worker/modules/send-email';
import { randomBytes } from 'crypto';
import { Types } from 'mongoose';
import {
  VERIFICATION_EMAIL_TOKEN_TTL,
  makeVerificationEmailUrl,
} from '../helpers';

@Injectable()
export class AuthEventsHandler {
  constructor(
    private readonly sendEmailWorkerService: SendEmailWorkerService,
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
  ) {}

  @OnEvent(EVENT_NAMES.UserUpdatedEmail)
  async handleUserUpdatedEmailEvent(
    user: User,
    newEmail: string,
  ): Promise<void> {
    setImmediate(async () => {
      const { _id: userId, fullName } = user;

      await this.userRepository.update({
        userId: userId,
        isVerifiedEmail: false,
      });

      const verificationToken = randomBytes(32).toString('hex');
      await this.tokenRepository.create({
        _id: new Types.ObjectId().toString(),
        userId: userId,
        value: verificationToken,
        type: TokenType.Verify,
        expiresAt: new Date(Date.now() + VERIFICATION_EMAIL_TOKEN_TTL),
      });

      const verificationUrl = makeVerificationEmailUrl(verificationToken);

      this.sendEmailWorkerService.addSendEmailJobToQueue({
        toEmail: newEmail,
        templatePath: EMAIL_TEMPLATE_PATHS.Verify,
        variables: {
          fullName: fullName,
          verificationUrl: verificationUrl,
        },
      });
    });
  }
}
