import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import {
  TransformLowerCaseString,
  TransformTrimString,
} from '@shared/decorators/transform';
import { IsEmail } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  /** Nếu `Admin` update `User` thì phải bổ sung field này */
  updaterId?: string;

  @Field(() => ID)
  id: string;

  @TransformTrimString()
  @TransformLowerCaseString()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  isVerifiedEmail: boolean;
}
