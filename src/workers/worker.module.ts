import { getBullModuleConfigs } from '@configs/queues';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EnvModule } from '@shared/modules/env/env.module';
import { EnvService } from '@shared/modules/env/env.service';
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
