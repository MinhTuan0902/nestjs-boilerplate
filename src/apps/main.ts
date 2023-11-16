import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ENV_VARIABLES } from '@shared/constants';
import { EnvService } from '@shared/modules/env';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] },
    }),
  );

  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');

  const envService = app.get(EnvService);
  const PORT: number = +envService.get(ENV_VARIABLES.Port) || 3000;

  await app.listen(PORT, () => {
    Logger.log(`Server successfully started on port ${PORT}`);
  });
}
bootstrap();
