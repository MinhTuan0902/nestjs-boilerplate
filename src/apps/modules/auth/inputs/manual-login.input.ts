import { Field, InputType } from '@nestjs/graphql';
import {
  TransformLowerCaseString,
  TransformTrimString,
} from '@shared/decorators/transform';

@InputType()
export class ManualLoginInput {
  @TransformTrimString()
  @TransformLowerCaseString()
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
