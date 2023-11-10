import { Field, InputType } from '@nestjs/graphql';
import {
  TransformLowerCaseString,
  TransformTrimString,
} from '@shared/decorators/transform';
import { MaxLength, MinLength } from 'class-validator';
import { IsValidPassword, IsValidUsername } from '../decorators';

@InputType()
export class ManualRegisterInput {
  @TransformTrimString()
  @TransformLowerCaseString()
  @IsValidUsername()
  @Field(() => String)
  username: string;

  @TransformTrimString()
  @MinLength(8)
  @MaxLength(36)
  @Field(() => String)
  fullName: string;

  @IsValidPassword()
  @Field(() => String)
  password: string;

  @Field(() => String)
  repeatPassword: string;

  encryptedPassword: string;
}
