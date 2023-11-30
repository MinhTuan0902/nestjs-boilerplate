import { registerEnumType } from '@nestjs/graphql';

export enum eUserRole {
  USER = 'user',
  ADMIN = 'admin',
}
registerEnumType(eUserRole, { name: 'UserRole' });
