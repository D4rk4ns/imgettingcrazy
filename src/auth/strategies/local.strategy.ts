import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Owner } from "src/owners/entities/owner.entity";
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({ usernameField: 'email'})
    }

    async validate(email: string, password: string): Promise<Owner>{
        const owner = await this.authService.validate(email, password);

        if(!owner){
            throw new UnauthorizedException();
        }

        return owner;
    }
}