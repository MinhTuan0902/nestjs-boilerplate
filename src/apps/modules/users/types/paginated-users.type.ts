import { ObjectType } from '@nestjs/graphql';
import { User } from '@shared/models';
import { PaginatedResponse } from '@shared/types';

@ObjectType()
export class PaginatedUsers extends PaginatedResponse(User) {}
