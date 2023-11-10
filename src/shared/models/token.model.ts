import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { TokenType } from '@shared/enums';
import { Document } from 'mongoose';
import { BaseModel } from './base';

@Schema({ timestamps: true })
export class Token extends BaseModel {
  value: string;
  type: TokenType;
  expiresAt: Date;
  revokedAt?: Date;
}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token);
