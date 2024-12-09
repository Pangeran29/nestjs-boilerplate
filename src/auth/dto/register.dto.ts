import { Prisma } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  intoUser(): Prisma.UserCreateInput {
    return {
      email: this.email,
      password: this.password,
    };
  }

  setPassword(password: string): string {
    this.password = password;
    return password;
  }
}
