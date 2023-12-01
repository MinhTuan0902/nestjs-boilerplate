import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QUEUE_NAMES } from '@shared/constants';
import { ExampleWorkerConsumer } from './example.worker.consumer';
import { ExampleWorkerService } from './example.worker.service';

@Module({
  imports: [BullModule.registerQueue({ name: QUEUE_NAMES.Example })],
  providers: [ExampleWorkerConsumer, ExampleWorkerService],
  exports: [ExampleWorkerService],
})
export class ExampleWorkerModule {}
