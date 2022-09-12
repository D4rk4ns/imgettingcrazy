import { AuthGuard } from "@nestjs/passport"



/**
 * This guard will be use in a local context
 */
export class LocalAuthGuard extends AuthGuard('local'){}