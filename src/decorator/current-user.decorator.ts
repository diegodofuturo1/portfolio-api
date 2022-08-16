import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CurrentUser {
  sub: string;
  email: string;
  iat: number;
  exp: number;
  token: string;
}

const param = (data: never, context: ExecutionContext) => {
  const { user } = context.switchToHttp().getRequest();
  return user as CurrentUser;
};

export const CurrentUser = createParamDecorator(param);
