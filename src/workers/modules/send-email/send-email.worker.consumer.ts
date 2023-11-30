import { Process, Processor } from '@nestjs/bull';
import { QUEUE_NAMES } from '@shared/constants';
import { Job } from 'bull';
import { SendEmailJobPayload } from './send-email.worker.service';

@Processor(QUEUE_NAMES.SendEmail)
export class SendEmailWorkerConsumer {
  constructor() {}

  @Process()
  async handleSendEmailJob(job: Job<SendEmailJobPayload>) {
    // TODO: Make and send verification email
    return {};
  }
}
