import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  /** Nếu `Admin` update `User` thì phải bổ sung field này */
  updaterId?: string;

  @Field(() => ID)
  userId: string;
}
