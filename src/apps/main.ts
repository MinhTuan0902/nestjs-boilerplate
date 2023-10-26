import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EnvVariable } from '@shared/enums';
import { EnvService } from '@shared/modules/env/env.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] },
    }),
  );

  const envService = app.get(EnvService);
  const PORT: number = +envService.get(EnvVariable.Port) || 3000;

  await app.listen(PORT, () => {
    Logger.log(`Server successfully started on port ${PORT}`);
  });
}
bootstrap();
