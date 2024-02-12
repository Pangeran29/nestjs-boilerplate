import { ResponseInterceptor } from '@app/common/interceptor/response.interceptor';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as Joi from 'joi';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from '@app/common/prisma/prisma.module';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''),
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    FileUploadModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule { }
