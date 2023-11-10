import { getJWTModuleOptions } from '@configs/auth';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvService } from '@shared/modules/env/env.service';
import { SendEmailWorkerModule } from '@worker/modules/send-email/send-email.worker.module';
import { TokenModule } from '../tokens/token.module';
import { UserModule } from '../users/user.module';
import { AuthController } from './controllers';
import { JWTAuthGuard, RolesGuard } from './guards';
import { AuthTokenHelper } from './helpers';
import { AuthMutationResolver, AuthQueryResolver } from './resolvers';
import { AuthService } from './services';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => getJWTModuleOptions(envService),
    }),
    forwardRef(() => UserModule),
    TokenModule,
    SendEmailWorkerModule,
  ],
  controllers: [AuthController],
  providers: [
    // Guards
    JWTAuthGuard,
    RolesGuard,

    // Helpers
    AuthTokenHelper,

    // Resolvers
    AuthMutationResolver,
    AuthQueryResolver,

    // Services
    AuthService,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
