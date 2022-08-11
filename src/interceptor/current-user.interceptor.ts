import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UserService } from 'src/endpoint/users/user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly users: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.users.getUserById(userId);
      request.currentUser = user;
    }

    return next.handle();
  }
}
