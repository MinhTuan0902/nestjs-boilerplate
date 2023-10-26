import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from '@shared/enums';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  get(envVar: EnvVariable): string {
    return this.configService.get(envVar);
  }
}
