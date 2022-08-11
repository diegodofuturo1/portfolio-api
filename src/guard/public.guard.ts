import 'dotenv/config';
import { AuthService } from 'src/endpoint/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { token } = request.headers || {};
    request.user = { id: process.env.ADMIN_KEY_ACCESS };

    if (token) {
      const user = this.auth.decodeToken(token);
      request.user = user;
    }

    return true;
  }
}
