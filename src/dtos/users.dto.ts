import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public fullName: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  public fullName?: string;

  @IsOptional()
  @IsEmail()
  public email?: string;

  @IsOptional()
  @IsString()
  public password?: string;
}

