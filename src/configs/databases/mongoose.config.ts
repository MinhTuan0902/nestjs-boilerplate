import { MongooseModuleOptions } from '@nestjs/mongoose';
import { EnvVariable } from '@shared/enums';
import { EnvService } from '@shared/modules/env/env.service';

export const getMongooseModuleOptions = (
  envService: EnvService,
): MongooseModuleOptions => {
  return {
    uri: envService.get(EnvVariable.MongoUrl),
  };
};
