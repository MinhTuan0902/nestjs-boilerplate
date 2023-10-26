import { UseGuards, applyDecorators } from '@nestjs/common';
import { JWTAuthGuard } from '../guards';

export function RequireAuth() {
  return applyDecorators(UseGuards(JWTAuthGuard));
}
