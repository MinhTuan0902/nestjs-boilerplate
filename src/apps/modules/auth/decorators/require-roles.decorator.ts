import { UseGuards, applyDecorators } from '@nestjs/common';
import { eUserRole } from '@shared/enums';
import { RolesGuard } from '../guards';
import { Roles } from './roles.decorator';

export function RequireRoles(...roles: Array<eUserRole>) {
  return applyDecorators(UseGuards(RolesGuard), Roles(...roles));
}
