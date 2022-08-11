import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const param = (data: never, context: ExecutionContext) => {
  const { user } = context.switchToHttp().getRequest();
  return user;
};

export const CurrentUser = createParamDecorator(param);
