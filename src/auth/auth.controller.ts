import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import {
  GetCurrentUser,
  JwtAuthGuard,
  LocalAuthGuard,
  Role,
  TCurrentUser,
  TResponseApi,
} from '@app/common';
import { TLoggedInAccount } from './type/logged-in-account.type';
import { RoleGuard } from '@app/common/guard/role.guard';
import { ERole } from '@prisma/client';
import { AccountService } from 'src/account/account.service';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly accountService: AccountService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @GetCurrentUser() currentUser: TLoggedInAccount,
    @Body() signInDto: SignInDto,
  ): Promise<TResponseApi> {
    let accessTokenPayload: TCurrentUser = {
      sub: currentUser.id,
      role: currentUser.role,
    };

    const token = await this.authService.generateJwtToken(accessTokenPayload);

    return {
      message: 'Success to sign in',
      data: {
        username: currentUser.username,
        accessToken: token,
        accessTokenValidFor: this.configService.get('JWT_EXPIRATION'),
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@GetCurrentUser() currentUser: TCurrentUser): Promise<TResponseApi> {
    const user = await this.accountService.findOne(currentUser.sub);
    return {
      message: 'Success to retrive user data',
      data: {
        username: user.username,
      },
    };
  }
}
