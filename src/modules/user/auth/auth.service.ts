import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.input'
import { SignupDto } from './dto/signup.input'
import { LogoutDto } from './dto/logout.input'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        if (!loginDto || !loginDto.email || !loginDto.password) {
            throw new BadRequestException('Dados de login ausentes: email e senha são obrigatórios');
        }

        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Senha incorreta');
        }

        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
        };
    }

    async signup(SignupDto: SignupDto) {
        const { name, email, birthdate, password } = SignupDto;

        if (!SignupDto || !SignupDto.email || !SignupDto.birthdate || !SignupDto.password) {
            throw new BadRequestException('Por favor, preencha todos os campos.');
        }
        const birthdateDate = new Date(birthdate);

        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('Email já está em uso');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createNewUser = await this.prisma.user.create({
            data: {
                name,
                email,
                birthdate: birthdateDate,
                password: hashedPassword,
            },
        });

        if (!createNewUser) {
            console.log('logar erro')
        }

        return {
            message: 'Usuário registrado com sucesso'
        };
    }

}
