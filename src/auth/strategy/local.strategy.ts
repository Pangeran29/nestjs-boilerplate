import { errMsg } from '@app/common/constant';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.isValidUser(username, password);
    if (!user) {
      throw new ForbiddenException(errMsg.authInvalidCredentialInvalid);
    }
    return user;
  }
}
