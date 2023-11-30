import { InjectQueue } from '@nestjs/bull';
import { QUEUE_NAMES } from '@shared/constants';
import { Job, Queue } from 'bull';

export interface SendEmailJobPayload {
  toEmail: string;
  templatePath: string;
  variables?: object;
}

export class SendEmailWorkerService {
  constructor(
    @InjectQueue(QUEUE_NAMES.SendEmail) private readonly sendEmailQueue: Queue,
  ) {}

  async addSendEmailJobToQueue(
    payload: SendEmailJobPayload,
  ): Promise<Job<SendEmailJobPayload>> {
    return this.sendEmailQueue.add(payload);
  }
}
