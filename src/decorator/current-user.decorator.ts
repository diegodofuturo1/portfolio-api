import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const param = (data: never, context: ExecutionContext) => {
  const { currentUser } = context.switchToHttp().getRequest();
  return currentUser;
};

export const CurrentUser = createParamDecorator(param);
