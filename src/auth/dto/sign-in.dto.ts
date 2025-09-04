import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  password: string;
}
