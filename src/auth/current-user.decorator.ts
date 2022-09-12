import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * With this function we can know wich is the user that is logged
 */
export const CurrentUser = createParamDecorator(
    (_data:unknown, context: ExecutionContext) => {
        if(context.getType() === 'http'){
            return context.switchToHttp().getRequest().user;
        }

        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    })