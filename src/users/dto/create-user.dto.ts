import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsString()
  email: string;

  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, {
    message: 'Mật khẩu phải chứa ít nhất một chữ cái (a-z) và một số (0-9)',
  })
  password: string;

  @IsPhoneNumber('VN', {
    message: 'Số điện thoại không hợp lệ',
  })
  phoneNumber: string;

  verificationCode: string;
}
