import { JwtModuleOptions } from '@nestjs/jwt';
import { ENV_VARIABLES } from '@shared/constants';
import { EnvService } from '@shared/modules/env';

export const getJWTModuleOptions = (
  envService: EnvService,
): JwtModuleOptions => {
  return {
    secret: envService.get(ENV_VARIABLES.JWTSecretString),
  };
};
