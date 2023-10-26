import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => String)
  value: string;

  @Field(() => Date, { nullable: true })
  expiresAt?: Date;
}

@ObjectType()
export class AuthTokens {
  @Field(() => Token)
  access: Token;

  @Field(() => Token)
  refresh: Token;
}
