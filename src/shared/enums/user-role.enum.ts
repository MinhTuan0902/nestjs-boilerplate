import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
}
registerEnumType(UserRole, { name: 'UserRole' });
