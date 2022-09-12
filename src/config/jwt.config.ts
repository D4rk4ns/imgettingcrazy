import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import appConfig from "./app.config";

export const jwtConfig: JwtModuleAsyncOptions = {
        useFactory: () => {
            return {
                secret: "This1sD3f1nitevlyASup3rL0ngS3cr3t",
                signOptions: {expiresIn: '1d'}
            }
        }
}