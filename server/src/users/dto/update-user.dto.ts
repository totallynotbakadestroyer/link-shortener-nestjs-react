import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  oldEmail: string;

  @IsString()
  @IsEmail()
  newEmail: string;

  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
