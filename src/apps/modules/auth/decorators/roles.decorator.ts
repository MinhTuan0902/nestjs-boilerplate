import { SetMetadata } from '@nestjs/common';
import { eUserRole } from '@shared/enums';

export const ROLE_KEY = 'role';
export const Roles = (...roles: Array<eUserRole>) =>
  SetMetadata(ROLE_KEY, roles);
