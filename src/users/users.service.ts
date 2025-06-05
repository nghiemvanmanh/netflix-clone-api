import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'database/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import * as nodemailer from 'nodemailer';
import { MAILER_TOKEN } from 'src/mailer/mailer.providers';
import { VerificationCode } from 'database/entities/verification-code.entity';
import * as escapeHtml from 'escape-html';
import { EnvService } from 'src/env/env.service';
import { SEVEN_HOURS_IN_MS, TEN_MINUTES_IN_MS } from 'src/constants/date';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(VerificationCode)
    private codeRepository: Repository<VerificationCode>,
    @Inject(MAILER_TOKEN)
    private transporter: nodemailer.Transporter,
    private readonly env: EnvService, // Giả sử bạn có một service để lấy biến môi trường
  ) {}

  async sendVerificationCode(email: string): Promise<void> {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 chữ số

    const codeEntity = this.codeRepository.create({ email, code });
    await this.codeRepository.save(codeEntity);

    const mailOptions = {
      from: this.env.get('EMAIL_USER'),
      to: email,
      subject: 'Mã xác minh đăng ký',
      html: `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        background-color: #f9f9f9; 
        padding: 20px; 
        border-radius: 10px; 
        max-width: 480px; 
        margin: auto; 
        border: 1px solid #ddd;
        color: #333;
      ">
        <h2 style="
          color: #e50914; 
          font-weight: 700; 
          text-align: center; 
          margin-bottom: 10px;
        ">
          🔒 Mã Xác Minh Đăng Ký
        </h2>
        <p>Xin chào,</p>
        <p>Bạn vừa yêu cầu mã xác minh cho việc đăng ký tài khoản.</p>
        <div style="
          background-color: #fff; 
          border: 2px dashed #e50914; 
          padding: 15px; 
          text-align: center; 
          font-size: 28px; 
          font-weight: 700; 
          letter-spacing: 5px; 
          margin: 20px 0; 
          border-radius: 8px;
          user-select: all;
        ">
          ${escapeHtml(code)}
        </div>
        <p style="color: #555;">
          Mã này có hiệu lực trong <strong>10 phút</strong>. Vui lòng không chia sẻ mã này với người khác.
        </p>
        <p style="font-size: 12px; color: #888; text-align: center; margin-top: 30px;">
          Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.
        </p>
      </div>
    `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (err) {
      console.error('Lỗi gửi email:', err);
      throw new InternalServerErrorException('Không thể gửi mã xác minh');
    }
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const record = await this.codeRepository.findOne({
      where: { email, code, isUsed: false },
      order: { createdAt: 'DESC' },
    });
    if (!record) return false;
    const createdAt = new Date(record.createdAt);
    const expired = new Date(
      createdAt.getTime() + SEVEN_HOURS_IN_MS + TEN_MINUTES_IN_MS,
    );

    if (new Date() > expired) {
      return false;
    }

    record.isUsed = true;
    console.log({ 'Đã sử dụng mã xác minh:': record });
    await this.codeRepository.save(record);
    return true;
  }

  async register(newUser: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: newUser.email },
    });

    if (user) {
      throw new ConflictException(`Email ${newUser.email} đã được đăng ký`);
    }

    const isValidCode = await this.verifyCode(
      newUser.email,
      newUser.verificationCode,
    );

    if (!isValidCode) {
      throw new BadRequestException('Mã xác minh không hợp lệ hoặc đã hết hạn');
    }

    const hashPass = await bcrypt.hash(newUser.password, 10);
    const userNew = this.userRepository.create({
      ...newUser,
      password: hashPass,
    });

    return this.userRepository.save(userNew);
  }

  async update(id: string, updatedUser: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new UnauthorizedException(`User ${id} not found`);
    }
    await this.userRepository.update(id, updatedUser);
    return user;
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new UnauthorizedException(`User ${id} not found`);
    }
    await this.userRepository.delete(id);
    return 'Deleted successfully';
  }
}
