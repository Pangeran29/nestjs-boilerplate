import {
  Body,
  Controller,
  Post,
  UseGuards
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CurrentUser } from '@app/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('local-login')
  async login(@CurrentUser() user: User, @Body() loginDto: LoginDto) {
    const token = await this.authService.getLoginToken(user);
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      loginTime: new Date(),
      tokenMetadata: {
        accessTokenValidFor: this.configService.get('JWT_EXPIRATION'),
        refreshTokenValidFor: '3h'
      },
      ...token
    };
  }

  @Post('local-register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}
