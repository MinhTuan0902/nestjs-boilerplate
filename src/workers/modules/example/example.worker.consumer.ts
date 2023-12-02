import { Process, Processor } from '@nestjs/bull';
import { QUEUE_NAMES } from '@shared/constants';
import { Job } from 'bull';
import { ExampleJobPayload } from './example.worker.service';

@Processor(QUEUE_NAMES.Example)
export class ExampleWorkerConsumer {
  @Process()
  handleExampleJob(job: Job<ExampleJobPayload>): ExampleJobPayload {
    console.log("Job's data payload from another services:", job.data.data);
    return job.data;
  }
}
