import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'your_secret_key',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }