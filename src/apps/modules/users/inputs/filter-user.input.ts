import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '@shared/enums';
import { BaseFilterInput } from '@shared/inputs';

@InputType()
export class FilterUsersInput extends BaseFilterInput {
  @Field(() => String, { nullable: true })
  username_equal?: string;

  @Field(() => String, { nullable: true })
  username_contains?: string;

  @Field(() => String, { nullable: true })
  fullName_equal?: string;

  @Field(() => String, { nullable: true })
  fullName_contains?: string;

  @Field(() => UserRole, { nullable: true })
  role_equal?: UserRole;

  @Field(() => [UserRole], { nullable: true })
  role_in?: Array<UserRole>;
}
