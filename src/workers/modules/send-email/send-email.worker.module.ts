import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueName } from '@shared/enums';
import { SendEmailWorkerConsumer } from './send-email.worker.consumer';
import { SendEmailWorkerService } from './send-email.worker.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.SendEmail,
    }),
  ],
  providers: [SendEmailWorkerConsumer, SendEmailWorkerService],
  exports: [SendEmailWorkerService],
})
export class SendEmailWorkerModule {}
