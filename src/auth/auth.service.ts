import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Owner } from '../owners/entities/owner.entity';
import { OwnersService } from '../owners/owners.service';
import { RegisterUserInput } from './dto/register-user.input';
import { hash, compare } from 'bcrypt';
import appConfig from 'src/config/app.config';

@Injectable()
export class AuthService {
    constructor( 
        private readonly ownersService: OwnersService,
        private readonly jwtService:JwtService){}

    async validate(email: string, password: string): Promise<Owner> | null {
        const owner = await this.ownersService.findByEmail(email);

        if(!owner){
            throw new HttpException('USER_NOT_FOUND', 404);
        }

        const checkPassword = await compare(password, owner.password);

        return checkPassword ? owner : null;

    }

    async register(registerUserInput: RegisterUserInput): Promise<Owner> {
        const {password } = registerUserInput;
        
        const plainToHash = await hash(password, 10);   //return the encrypted pass

        registerUserInput = {...registerUserInput, password: plainToHash};

        return await this.ownersService.create(registerUserInput);
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

    async verify(token: string): Promise<Owner | Error>{
        const decoded = await this.jwtService.verify(token, {
            secret: appConfig().appSecret
        });

        const owner = await this.ownersService.findByEmail(decoded.email);

        if(!owner){
            throw new Error('Unable to get the owner from decoded token');
        }

        return owner;
    }
    
}
