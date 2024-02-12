import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRerfreshToken } from 'src/auth/type/user-refresh-token.type';
import { SCOPE_JWT_TOKEN } from '../jwt/enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException();
    }

    const { scope } = user as UserRerfreshToken;
    if (scope !== SCOPE_JWT_TOKEN.AT) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
