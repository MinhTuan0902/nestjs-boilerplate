import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from '@shared/models';
import { TokenRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  providers: [TokenRepository],
  exports: [TokenRepository],
})
export class TokenModule {}
