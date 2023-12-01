import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';

function bootstrapWorker(): void {
  NestFactory.createApplicationContext(WorkerModule).then(() => {
    Logger.log('Worker service successfully started');
  });
}

bootstrapWorker();
