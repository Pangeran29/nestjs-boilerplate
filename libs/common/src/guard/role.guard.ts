import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { errMsg } from '../constant';
import { ROLE_KEY } from '../decorator/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector
      .getAllAndOverride<UserRole[]>(
        ROLE_KEY,
        [context.getHandler(), context.getClass()]
      );

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const role = user.role;
    if (!role) {
      throw new ForbiddenException(errMsg.roleGuardNotHaveAccess);
    }

    const hasRole = requiredRole.includes(role);
    if (!hasRole) {
      throw new ForbiddenException(errMsg.roleGuardNotHaveAccess);
    }

    return true;
  }
}
