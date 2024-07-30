import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  // @ApiProperty({
  //   description: 'Has to match a regular expression: /^\\+[1-9]\\d{1,14}$/',
  //   example: '+123123123123',
  // })
  // @IsString()
  // @IsNotEmpty()
  // @Matches(/^\+[1-9]\d{1,14}$/)
  // phoneNumber?: string;

  // @IsString()
  // nickname?: string;

  // @IsString()
  // firstName?: string;

  // @IsString()
  // lastName?: string;

  // @IsDateString()
  // birthdate?: string;
}
