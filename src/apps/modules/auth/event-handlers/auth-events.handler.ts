import { TokenRepository } from '@app/modules/tokens/repositories';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENT_NAMES } from '@shared/constants';
import { eTokenType } from '@shared/enums';
import { makeObjectId } from '@shared/utils';
import { Token } from '../types';

@Injectable()
export class AuthEventsHandler {
  constructor(private readonly tokenRepository: TokenRepository) {}

  @OnEvent(EVENT_NAMES.UserLoggedIn)
  handleUserLoggedInEvent(userId: string, refreshToken: Token): void {
    setImmediate(() => {
      try {
        this.tokenRepository.create({
          _id: makeObjectId().toString(),
          userId: userId,
          value: refreshToken.value,
          expiresAt: refreshToken.expiresAt,
          type: eTokenType.REFRESH,
        });
      } catch (error) {
        // TODO: Use custom logger
        console.error(error);
      }
    });
  }
}
