import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  AppResponseInterceptor,
  PrismaModule,
} from '@app/common';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        APP_NAME: Joi.string().required(),
        PREFIX_NAME: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
      }),
    }),
    PrismaModule,
    AccountModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppResponseInterceptor,
    },
  ],
})
export class AppModule {}
