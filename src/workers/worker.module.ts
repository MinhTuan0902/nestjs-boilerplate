import { getBullModuleConfigs } from '@configs/queues';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EnvModule, EnvService } from '@shared/modules/env';
import { ExampleWorkerModule } from './modules/example';

@Module({
  imports: [
    EnvModule,

    BullModule.forRootAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => getBullModuleConfigs(envService),
    }),

    ExampleWorkerModule,
  ],
})
export class WorkerModule {}
