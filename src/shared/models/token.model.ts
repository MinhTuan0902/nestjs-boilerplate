import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { eTokenType } from '@shared/enums';
import { Document, Schema as MongoSchema } from 'mongoose';
import { BaseModel } from './base';

@Schema({ timestamps: true })
export class Token extends BaseModel {
  @Prop({ type: MongoSchema.Types.ObjectId, required: true })
  userId: string;

  @Prop({ type: String, required: true, unique: true })
  value: string;

  @Prop({ type: String, enum: eTokenType })
  type: eTokenType;

  @Prop({ type: Date, required: true })
  expiresAt: Date;

  @Prop({ type: Date })
  revokedAt?: Date;
}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token);
