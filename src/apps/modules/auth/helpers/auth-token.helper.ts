import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvVariable, TokenType } from '@shared/enums';
import { User } from '@shared/models';
import { EnvService } from '@shared/modules/env/env.service';
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
        payload.type === TokenType.Access
          ? +this.envService.get(EnvVariable.JWTAccessTokenTimeExpiration)
          : +this.envService.get(EnvVariable.JWTRefreshTokenTimeExpiration),
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
        value: this.signJWT({ ...baseJWTData, type: TokenType.Access }),
        expiresAt: new Date(),
      },
      refresh: {
        value: this.signJWT({ ...baseJWTData, type: TokenType.Refresh }),
        expiresAt: new Date(),
      },
    };
  }
}
