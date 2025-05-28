import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;

  @IsPhoneNumber('VN', {
    message: 'Số điện thoại không hợp lệ',
  })
  @IsNotEmpty()
  phoneNumber: string;
}
