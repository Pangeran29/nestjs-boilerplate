import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { ExtractJWT } from './type/extract-jwt.type';
import { UserAccessToken } from './type/user-access-token.type';
import { UserRerfreshToken } from './type/user-refresh-token.type';
import { SCOPE_JWT_TOKEN } from '@app/common/jwt/enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async extractJWTAccessToken(jwt: string): Promise<ExtractJWT> {
    let payload: ExtractJWT;
    try {
      const userMetadata = await this.jwtService.verifyAsync(jwt);
      payload = {
        isSuccess: true,
        currentUserMetadata: userMetadata,
      };
    } catch (error) {
      payload = {
        isSuccess: false,
        error: error?.message,
      };
    }
    return payload;
  }

  async isValidUser(username: string, password: string): Promise<User | Boolean> {
    const user = await this.userService.findUserByUsername(username);
    if (user && password === user.password) return user;
    return false;
  }

  async register(registerDto: RegisterDto) {
    return await this.userService.create(registerDto);
  }

  async getLoginToken({ id, username, role }: Partial<User>) {
    const accessTokenPayload: UserAccessToken = {
      sub: id,
      username,
      role,
      scope: SCOPE_JWT_TOKEN.AT,
    };

    const refreshTokenPayload: UserRerfreshToken = {
      sub: id,
      username,
      role,
      scope: SCOPE_JWT_TOKEN.RT,
    };

    const accessToken = await this.jwtService
      .signAsync(accessTokenPayload);

    const refreshToken = await this.jwtService
      .signAsync(
        refreshTokenPayload,
        { expiresIn: '3h' }
      );

    return { accessToken, refreshToken };
  }
}
