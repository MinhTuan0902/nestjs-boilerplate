import { IsValidPassword, IsValidUsername } from '@app/modules/auth/decorators';
import { Field, InputType } from '@nestjs/graphql';
import {
  TransformLowerCaseString,
  TransformTrimString,
} from '@shared/decorators/transform';
import { UserRole } from '@shared/enums';

@InputType()
export class CreateUserInput {
  creatorId: string;

  @TransformTrimString()
  @TransformLowerCaseString()
  @IsValidUsername()
  @Field(() => String)
  username: string;

  @TransformTrimString()
  @TransformLowerCaseString()
  @IsValidPassword()
  @Field(() => String)
  password: string;
  encryptedPassword: string;

  @Field(() => UserRole)
  role: UserRole;
}
