import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserRole } from '@shared/enums';
import { RolesGuard } from '../guards';
import { Roles } from './roles.decorator';

export function RequireRoles(...roles: Array<UserRole>) {
  return applyDecorators(UseGuards(RolesGuard), Roles(...roles));
}
