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
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, {
    message: 'Mật khẩu phải chứa ít nhất một chữ cái (a-z) và một số (0-9)',
  })
  password: string;

  @IsPhoneNumber('VN', {
    message: 'Số điện thoại không hợp lệ',
  })
  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  verificationCode: string;
}
