import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAgent = createParamDecorator(
  (_data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.header('User-Agent');
  },
);
