import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class BaseFilterInput {
  @Field(() => ID, { nullable: true })
  id_equal?: string;
}
