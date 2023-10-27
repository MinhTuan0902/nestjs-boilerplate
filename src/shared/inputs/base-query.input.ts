import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PageOptionInput } from './page-option.input';

@InputType({ isAbstract: true })
export class BaseQueryInput {
  @ValidateNested()
  @Type(() => PageOptionInput)
  @Field(() => PageOptionInput)
  pageOption: PageOptionInput;
}
