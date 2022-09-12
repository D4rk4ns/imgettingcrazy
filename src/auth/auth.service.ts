import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from '../owners/owners.service';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
    constructor( 
        private readonly ownersService: OwnersService,
        private readonly jwtService:JwtService){}

    async validate(email: string, password: string): Promise<Owner> | null {
        const owner = await this.ownersService.findByEmail(email);

        if(!owner){
            return null;
        }

        /**
         * In here we'll compre the encrypted password, but not for now
         */

        const passwordIsValid = password === owner.password;

        return passwordIsValid ? owner : null;

    }

    login(owner: Owner): { access_token: string}{
        const payload = {
            email : owner.email,
            sub: owner.id
        }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async verify(token: string): Promise<Owner>{
        const decoded = this.jwtService.verify(token, {
            secret: jwtSecret
        });

        const owner = await this.ownersService.findByEmail(decoded.email);

        if(!owner){
            throw new Error('Unable to get the owner from decoded token');
        }

        return owner;
    }
    
}
