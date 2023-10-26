import { getMongooseModuleOptions } from '@configs/databases';
import { getApolloDriverConfig } from '@configs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from '@shared/modules/env/env.module';
import { EnvService } from '@shared/modules/env/env.service';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    EnvModule,

    MongooseModule.forRootAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) =>
        getMongooseModuleOptions(envService),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>(getApolloDriverConfig()),

    // Modules
    AuthModule,
    HealthCheckModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
