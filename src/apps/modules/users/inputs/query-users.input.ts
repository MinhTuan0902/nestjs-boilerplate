import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { BaseQueryInput } from '@shared/inputs';
import { FilterUsersInput } from './filter-user.input';

export enum SortingUsersOptionInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UsernameAsc = 'username_ASC',
  UsernameDesc = 'username_DESC',
}
registerEnumType(SortingUsersOptionInput, { name: 'SortingUsersOptionInput' });

@InputType()
export class QueryUsersInput extends BaseQueryInput {
  @Field(() => FilterUsersInput)
  filter: FilterUsersInput;

  @Field(() => SortingUsersOptionInput, {
    defaultValue: SortingUsersOptionInput.CreatedAtAsc,
  })
  sortingOption: SortingUsersOptionInput;
}
