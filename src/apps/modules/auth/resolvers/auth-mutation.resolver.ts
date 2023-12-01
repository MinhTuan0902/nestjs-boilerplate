import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
}
