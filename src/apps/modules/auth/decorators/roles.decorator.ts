import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@shared/enums';

export const ROLE_KEY = 'role';
export const Roles = (...roles: Array<UserRole>) =>
  SetMetadata(ROLE_KEY, roles);
