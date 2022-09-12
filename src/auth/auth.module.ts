import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OwnersModule } from '../owners/owners.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
    imports: [
        OwnersModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync(jwtConfig)
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy]
})
export class AuthModule {}
