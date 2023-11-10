import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@shared/models';
import { ParseEmailPipe } from '@shared/pipes';
import { CurrentUser, RequireAuth } from '../decorators';
import { ManualLoginInput, ManualRegisterInput } from '../inputs';
import { AuthService } from '../services';
import { AuthTokens } from '../types';

@Resolver()
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthTokens)
  async manualRegister(
    @Args('manualRegisterInput') manualRegisterInput: ManualRegisterInput,
  ): Promise<AuthTokens> {
    return this.authService.manualRegister(manualRegisterInput);
  }

  @Mutation(() => AuthTokens)
  async manualLogin(
    @Args('manualLoginInput') manualLoginInput: ManualLoginInput,
  ): Promise<AuthTokens> {
    return this.authService.manualLogin(manualLoginInput);
  }

  @RequireAuth()
  @Mutation(() => Boolean)
  async updateEmail(
    @Args('email', ParseEmailPipe) email: string,
    @CurrentUser() { _id: currentUserId, email: currentEmail }: User,
  ): Promise<boolean> {
    return this.authService.updateEmail(currentUserId, currentEmail, email);
  }
}
