import { eTokenType, eUserRole } from '@shared/enums';

export interface JWTData {
  userId: string;
  role: eUserRole;
  type: eTokenType;
}
