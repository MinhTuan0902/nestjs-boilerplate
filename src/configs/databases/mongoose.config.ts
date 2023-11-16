import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ENV_VARIABLES } from '@shared/constants';
import { EnvService } from '@shared/modules/env';

export const getMongooseModuleOptions = (
  envService: EnvService,
): MongooseModuleOptions => {
  return {
    uri: envService.get(ENV_VARIABLES.MongoUrl),
  };
};
