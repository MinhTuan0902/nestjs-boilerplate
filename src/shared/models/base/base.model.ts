import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

@ObjectType()
export class BaseModel {
  @Field(() => ID)
  _id: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Prop({ type: Date })
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Prop({ type: Schema.Types.ObjectId })
  @Field(() => ID, { nullable: true })
  creatorId?: string;

  @Prop({ type: Schema.Types.ObjectId })
  @Field(() => ID, { nullable: true })
  updaterId?: string;
}
