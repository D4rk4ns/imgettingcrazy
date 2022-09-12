import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import appConfig from 'src/config/app.config';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from '../../owners/owners.service';
import { jwtSecret } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly ownersService: OwnersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret, //tengo q cambiar esto despues
        })
    }

    async validate(validationPayload: {email: string, sub: string}): Promise<Owner> | null {
        return await this.ownersService.findByEmail(validationPayload.email);
    }
}