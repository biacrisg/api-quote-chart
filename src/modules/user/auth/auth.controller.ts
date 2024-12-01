import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.input';
import { SignupDto } from './dto/signup.input';
import { LogoutDto } from './dto/logout.input';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('signup')
    async signup(@Body() SignupDto: SignupDto) {
        return this.authService.signup(SignupDto);
    }

}
