import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";


/**
 * This guard will be use in a GraphQL context
 */
export class GqlAuthGuard extends AuthGuard('jwt'){
    getRequest(context: ExecutionContext): any {
        const ctx = GqlExecutionContext.create(context);
        
        /**
         * This passes it back the current request object in a Graphql context
         */
        return ctx.getContext().req;
    }
}