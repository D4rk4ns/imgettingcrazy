import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OwnersModule } from '../owners/owners.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constants';

@Module({
    imports: [
        OwnersModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: jwtSecret,
            signOptions: {expiresIn: '36000s'}
        })
    ],
    providers: [AuthService]
})
export class AuthModule {}
