import { BullModuleOptions } from '@nestjs/bull';
import { ENV_VARIABLES } from '@shared/constants';
import { EnvService } from '@shared/modules/env';

export const getBullModuleConfigs = (
  envService: EnvService,
): BullModuleOptions => {
  return {
    redis: {
      host: envService.get(ENV_VARIABLES.RedisHost),
      port: +envService.get(ENV_VARIABLES.RedisPort),
    },
  };
};
