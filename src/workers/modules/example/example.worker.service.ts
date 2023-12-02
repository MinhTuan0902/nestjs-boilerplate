import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { QUEUE_NAMES } from '@shared/constants';
import { Job, Queue } from 'bull';

export interface ExampleJobPayload {
  data: number;
}

@Injectable()
export class ExampleWorkerService {
  constructor(
    @InjectQueue(QUEUE_NAMES.Example) private readonly exampleQueue: Queue,
  ) {}

  async addExampleJobToQueue(
    payload: ExampleJobPayload,
  ): Promise<Job<ExampleJobPayload>> {
    return this.exampleQueue.add(payload, { removeOnComplete: true });
  }
}
