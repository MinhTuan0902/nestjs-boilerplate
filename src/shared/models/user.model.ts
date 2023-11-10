import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '@shared/enums';
import { Document } from 'mongoose';
import { BaseModel } from './base';

@ObjectType()
@Schema({ timestamps: true })
export class User extends BaseModel {
  @Prop({ type: String, unique: true })
  @Field(() => String)
  username: string;

  @Prop({ type: String })
  @Field(() => String)
  fullName: string;

  @Prop({ type: String })
  encryptedPassword: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.User })
  @Field(() => UserRole)
  role: UserRole;

  @Prop({ type: String })
  @Field(() => String, { nullable: true })
  email?: string;

  @Prop({ type: Boolean, default: false })
  @Field(() => Boolean)
  isVerifiedEmail: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
