import { PrismaService } from '../../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.input';
import { SignupDto } from './dto/signup.input';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    signup(SignupDto: SignupDto): Promise<{
        message: string;
    }>;
}
