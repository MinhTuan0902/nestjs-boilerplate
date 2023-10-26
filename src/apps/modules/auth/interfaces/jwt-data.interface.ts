import { TokenType, UserRole } from '@shared/enums';

export interface JWTData {
  userId: string;
  role: UserRole;
  type: TokenType;
}
