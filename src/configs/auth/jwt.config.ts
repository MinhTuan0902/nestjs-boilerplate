import { JwtModuleOptions } from '@nestjs/jwt';
import { EnvVariable } from '@shared/enums';
import { EnvService } from '@shared/modules/env/env.service';

export const getJWTModuleOptions = (
  envService: EnvService,
): JwtModuleOptions => {
  return {
    secret: envService.get(EnvVariable.JWTSecretString),
  };
};
