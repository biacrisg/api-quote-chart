import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.input';
import { SignupDto } from './dto/signup.input';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    signup(SignupDto: SignupDto): Promise<{
        message: string;
    }>;
}
