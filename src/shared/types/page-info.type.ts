import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => Boolean)
  hasNextPage: boolean;
}
