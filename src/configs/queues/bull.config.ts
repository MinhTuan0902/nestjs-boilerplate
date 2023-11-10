import { BullModuleOptions } from '@nestjs/bull';
import { EnvVariable } from '@shared/enums';
import { EnvService } from '@shared/modules/env/env.service';

export const getBullModuleConfigs = (
  envService: EnvService,
): BullModuleOptions => {
  return {
    redis: {
      host: envService.get(EnvVariable.RedisHost),
      port: +envService.get(EnvVariable.RedisPort),
    },
  };
};
