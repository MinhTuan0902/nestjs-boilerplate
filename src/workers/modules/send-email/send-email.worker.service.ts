import { InjectQueue } from '@nestjs/bull';
import { QueueName } from '@shared/enums';
import { Queue } from 'bull';

export interface SendEmailJobPayload {
  toEmail: string;
  mjmlTemplatePath: string;
}

export class SendEmailWorkerService {
  constructor(
    @InjectQueue(QueueName.SendEmail) private readonly sendEmailQueue: Queue,
  ) {}

  async addSendEmailJobToQueue(payload: SendEmailJobPayload): Promise<void> {
    this.sendEmailQueue.add(payload);
  }
}
