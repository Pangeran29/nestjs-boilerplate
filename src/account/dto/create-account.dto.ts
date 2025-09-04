import { $Enums, Prisma } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAccountDto implements Prisma.AccountCreateInput {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  password: string;

  @IsNotEmpty()
  @IsEnum($Enums.ERole)
  role: $Enums.ERole;

  @IsNumber()
  @IsOptional()
  clinicId?: number

  @IsOptional()
  @IsString()
  fcmToken?: string;
}
