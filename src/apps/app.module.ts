import { getMongooseModuleOptions } from '@configs/databases';
import { getApolloDriverConfig } from '@configs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule, EnvService } from '@shared/modules/env';
import { ExampleWorkerModule } from '@worker/modules/example';
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

    EventEmitterModule.forRoot(),

    // Modules
    AuthModule,
    HealthCheckModule,
    UserModule,

    ExampleWorkerModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
