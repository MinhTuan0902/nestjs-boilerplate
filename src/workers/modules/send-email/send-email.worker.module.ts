import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QUEUE_NAMES } from '@shared/constants';
import { SendEmailWorkerConsumer } from './send-email.worker.consumer';
import { SendEmailWorkerService } from './send-email.worker.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAMES.SendEmail,
    }),
  ],
  providers: [SendEmailWorkerConsumer, SendEmailWorkerService],
  exports: [SendEmailWorkerService],
})
export class SendEmailWorkerModule {}
