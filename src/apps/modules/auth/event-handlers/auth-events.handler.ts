import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventName } from '@shared/enums';

@Injectable()
export class AuthEventsHandler {
  constructor() {}

  @OnEvent(EventName.UserUpdatedEmail)
  async handleUserUpdatedEmailEvent(
    userId: string,
    newEmail: string,
  ): Promise<void> {
    // TODO: Send verify email
  }
}
