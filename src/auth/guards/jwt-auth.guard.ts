import { AuthGuard } from "@nestjs/passport"



/**
 * This guard will be use in a REST-API context
 */
export class JwtAuthGuard extends AuthGuard('jwt'){}