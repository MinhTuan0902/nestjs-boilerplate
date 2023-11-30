import { Field, InputType } from '@nestjs/graphql';
import { eUserRole } from '@shared/enums';
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

  @Field(() => eUserRole, { nullable: true })
  role_equal?: eUserRole;

  @Field(() => [eUserRole], { nullable: true })
  role_in?: Array<eUserRole>;
}
