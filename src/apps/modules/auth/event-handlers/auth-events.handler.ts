import { TokenRepository } from '@app/modules/tokens/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthEventsHandler {
  constructor(private readonly tokenRepository: TokenRepository) {}
}
