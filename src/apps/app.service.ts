import { Injectable } from '@nestjs/common';
import { ExampleWorkerService } from '@worker/modules/example';
import { randomInt } from 'crypto';

@Injectable()
export class AppService {
  constructor(private readonly exampleWorkerService: ExampleWorkerService) {}

  getHello(): string {
    this.exampleWorkerService.addExampleJobToQueue({
      data: randomInt(10000),
    });
    return 'Hello World!';
  }
}
