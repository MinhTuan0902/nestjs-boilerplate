import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class PageOptionInput {
  @Min(1, { message: 'limit must be at least equal to 1' })
  @Max(999, { message: 'limit should not be greater than 999' })
  @Field(() => Int, { defaultValue: 10 })
  limit: number;

  @Min(0, { message: 'skip must be at least equal to 0' })
  @Field(() => Int, { defaultValue: 0 })
  skip: number;
}
