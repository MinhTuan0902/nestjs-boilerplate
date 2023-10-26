import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '@shared/enums';
import { Document } from 'mongoose';
import { BaseModel } from './base.model';

@ObjectType()
@Schema({ timestamps: true })
export class User extends BaseModel {
  @Prop({ type: String, unique: true })
  @Field(() => String)
  username: string;

  @Prop({ type: String })
  encryptedPassword: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.User })
  role: UserRole;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
