import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ENV_VARIABLES } from '@shared/constants';
import { eTokenType } from '@shared/enums';
import { User } from '@shared/models';
import { EnvService } from '@shared/modules/env';
import { JWTData } from '../interfaces';
import { AuthTokens } from '../types';

@Injectable()
export class AuthTokenHelper {
  constructor(
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
  ) {}

  signJWT(payload: JWTData): string {
    return this.jwtService.sign(payload, {
      expiresIn:
        payload.type === eTokenType.ACCESS
          ? +this.envService.get(ENV_VARIABLES.JWTAccessTokenTimeExpiration)
          : +this.envService.get(ENV_VARIABLES.JWTRefreshTokenTimeExpiration),
      algorithm: 'HS256',
    });
  }

  extractBaseJWTDataFromUser({
    _id,
    role,
  }: User): Pick<JWTData, 'userId' | 'role'> {
    return {
      userId: _id,
      role: role,
    };
  }

  generateAuthTokens(user: User): AuthTokens {
    const baseJWTData = this.extractBaseJWTDataFromUser(user);
    return {
      access: {
        value: this.signJWT({ ...baseJWTData, type: eTokenType.ACCESS }),
        expiresAt: new Date(),
      },
      refresh: {
        value: this.signJWT({ ...baseJWTData, type: eTokenType.REFRESH }),
        expiresAt: new Date(),
      },
    };
  }
}
