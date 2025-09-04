import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AccountService } from 'src/account/account.service';
import { ERole } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const account = await this.authService.isValidAccount(username, password);
    if (!account) {
      throw new UnauthorizedException(
        'Account is not registered in our system',
      );
    }
    return account;
  }
}
