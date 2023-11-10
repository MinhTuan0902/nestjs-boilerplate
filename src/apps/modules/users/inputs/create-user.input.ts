import { IsValidPassword, IsValidUsername } from '@app/modules/auth/decorators';
import { Field, InputType } from '@nestjs/graphql';
import {
  TransformLowerCaseString,
  TransformTrimString,
} from '@shared/decorators/transform';
import { UserRole } from '@shared/enums';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  creatorId: string;

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

  @TransformTrimString()
  @TransformLowerCaseString()
  @IsValidPassword()
  @Field(() => String)
  password: string;
  encryptedPassword: string;

  @Field(() => UserRole, { defaultValue: UserRole.User })
  role: UserRole;

  @TransformTrimString()
  @TransformLowerCaseString()
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Boolean, { nullable: true })
  isVerifiedEmail?: boolean;
}
