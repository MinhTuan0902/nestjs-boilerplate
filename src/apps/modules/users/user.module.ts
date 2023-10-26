import { UserRepository } from '@app/modules/users/repositories';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@shared/models';
import { AuthModule } from '../auth/auth.module';
import { UserHelper } from './helpers';
import { UserMutationResolver, UserQueryResolver } from './resolvers';
import { UserService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [
    // Helpers
    UserHelper,

    // Repositories
    UserRepository,

    // Resolvers
    UserMutationResolver,
    UserQueryResolver,

    // Services
    UserService,
  ],
  exports: [
    // Helpers
    UserHelper,

    // Repositories
    UserRepository,
  ],
})
export class UserModule {}
