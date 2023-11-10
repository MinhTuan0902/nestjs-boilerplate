import { Process, Processor } from '@nestjs/bull';
import { QueueName } from '@shared/enums';
import { Job } from 'bull';
import { SendEmailJobPayload } from './send-email.worker.service';

@Processor(QueueName.SendEmail)
export class SendEmailWorkerConsumer {
  constructor() {}

  @Process()
  async handleSendEmailJob(job: Job<SendEmailJobPayload>) {
    console.log(job.data);
  }
}
