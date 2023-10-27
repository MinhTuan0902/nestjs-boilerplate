import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from './page-info.type';

interface IPaginated<T> {
  items: Array<T>;
  totalItems: number;
  pageInfo: PageInfo;
}

export function PaginatedResponse<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class Paginated implements IPaginated<T> {
    @Field(() => [classRef])
    items: Array<T>;

    @Field(() => Int)
    totalItems: number;

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }

  return Paginated;
}
