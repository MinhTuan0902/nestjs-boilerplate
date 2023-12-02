import { getMongooseModuleOptions } from '@configs/databases';
import { getApolloDriverConfig } from '@configs/graphql';
import { getBullModuleConfigs } from '@configs/queues';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { QUEUE_NAMES } from '@shared/constants';
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

    // BullModule.forRootAsync({
    //   inject: [EnvService],
    //   useFactory: (envService: EnvService) => getBullModuleConfigs(envService),
    // }),
    // BullModule.registerQueue({ name: QUEUE_NAMES.Example }),

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
