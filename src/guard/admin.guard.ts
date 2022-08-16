import 'dotenv/config';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/endpoint/auth/auth.service';

export class AdminGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const { token } = request.headers || {};

      if (token) {
        const auth = this.auth.verifyToken(token);
        const user = this.auth.decodeToken(token);

        request.auth = auth && user.sub == process.env.ADMIN_KEY_ACCESS;
        request.user = user;
      }

      return request.auth;
    } catch {
      return false;
    }
  }
}
