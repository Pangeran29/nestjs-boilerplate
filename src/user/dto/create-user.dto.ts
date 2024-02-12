import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto implements Partial<User> {
  @ApiProperty({ description: "A unique username used for login" })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: "Full name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "A strong password contains capital, number, and symbol" })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ description: "Role of user", enum: $Enums.UserRole })
  @IsEnum($Enums.UserRole)
  @IsNotEmpty()
  role: $Enums.UserRole;
}
