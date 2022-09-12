import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Owner } from 'src/owners/entities/owner.entity';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserInput } from './dto/register-user.input';

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request): { access_token: string } {
        return this.authService.login(req.user as Owner);
    }

    @Post('register')   //A editar
    register(@Body() userObject: RegisterUserInput): Promise<Owner>  {
        return this.authService.register(userObject);
    }
}