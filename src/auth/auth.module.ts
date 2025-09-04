import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { privateKey, publicKey } from '../../libs/common/src/key/private-and-public.key';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AccountModule } from 'src/account/account.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  imports: [
    forwardRef(() => AccountModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        privateKey: privateKey,
        publicKey: publicKey,
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION'),
          algorithm: 'RS256',
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
    }),
    forwardRef(() => AccountModule),
  ],
})
export class AuthModule {}
