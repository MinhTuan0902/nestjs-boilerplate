import { Field, InputType } from '@nestjs/graphql';
import {
  TransformLowerCaseString,
  TransformTrimString,
} from '@shared/decorators/transform';
import { IsValidPassword, IsValidUsername } from '../decorators';

@InputType()
export class ManualRegisterInput {
  @TransformTrimString()
  @TransformLowerCaseString()
  @IsValidUsername()
  @Field(() => String)
  username: string;

  @IsValidPassword()
  @Field(() => String)
  password: string;

  @Field(() => String)
  repeatPassword: string;

  encryptedPassword: string;
}
