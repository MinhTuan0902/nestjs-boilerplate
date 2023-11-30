import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { eUserRole } from '@shared/enums';
import { Document } from 'mongoose';
import { BaseModel } from './base';

@ObjectType()
@Schema({ timestamps: true })
export class User extends BaseModel {
  @Prop({ type: String, required: true, unique: true })
  @Field(() => String)
  username: string;

  @Prop({ type: String, required: true })
  @Field(() => String)
  fullName: string;

  @Prop({ type: String })
  encryptedPassword: string;

  @Prop({
    type: String,
    required: true,
    enum: eUserRole,
    default: eUserRole.USER,
  })
  @Field(() => eUserRole)
  role: eUserRole;

  @Prop({ type: String })
  @Field(() => String, { nullable: true })
  email?: string;

  @Prop({ type: Boolean, default: false })
  @Field(() => Boolean)
  isVerifiedEmail: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
