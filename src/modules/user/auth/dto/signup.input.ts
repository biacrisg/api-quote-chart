// src/auth/dto/register.dto.ts
import { IsEmail, IsString, MinLength, MaxLength, IsDate } from 'class-validator';

export class SignupDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsEmail()
    email: string;

    @IsDate()
    birthdate: Date;

    @IsString()
    @MinLength(6)
    password: string;

}
