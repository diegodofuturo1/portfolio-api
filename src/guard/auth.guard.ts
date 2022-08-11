import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/endpoint/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { token } = request.headers || {};

    if (token) {
      const auth = this.auth.verifyToken(token);
      request.auth = auth;

      const user = this.auth.decodeToken(token);
      request.user = user;
    }

    return request.auth;
  }
}
