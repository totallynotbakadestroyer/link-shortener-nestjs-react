import * as requestIp from 'request-ip';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IpAddress = createParamDecorator(
  (_data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return requestIp.getClientIp(req);
  },
);
