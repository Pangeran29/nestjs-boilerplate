import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';
import { decrypt } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async isValidAccount(username: string, password: string) {
    const user = await this.accountService.findByUsername(username);
    if (!user) return false;
    const decryptedPasword = await decrypt(user.password);
    if (user && password === decryptedPasword) return user;
    return false;
  }

  async generateJwtToken(data: any, options?: JwtSignOptions) {
    try {
      return await this.jwtService.signAsync(data, options);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Fail to generateJWT token.',
        error,
      });
    }
  }

  async verifyJwtToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Fail to verify JWT token. Token either expired or malformed',
        error,
      });
    }
  }
}
