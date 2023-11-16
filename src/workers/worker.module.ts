import { getBullModuleConfigs } from '@configs/queues';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EnvModule, EnvService } from '@shared/modules/env';
import { SendEmailWorkerModule } from './modules/send-email';

@Module({
  imports: [
    EnvModule,

    BullModule.forRootAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => getBullModuleConfigs(envService),
    }),

    SendEmailWorkerModule,
  ],
})
export class WorkerModule {}
