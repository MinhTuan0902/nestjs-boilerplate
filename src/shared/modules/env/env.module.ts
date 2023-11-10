import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';

@Global()
@Module({
  // TODO: Validate .env
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
