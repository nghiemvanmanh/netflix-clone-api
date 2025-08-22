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
import { VerificationCode } from 'database/entities/verification-code.entity';
import { EnvService } from 'src/env/env.service';
import { addMinutes, addHours, isAfter, parseISO } from 'date-fns';
import { mailOptions_Register } from 'src/common/email-templates/email-register';
import { MAILER_TOKEN } from 'src/mailer/mailer.providers';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(VerificationCode)
    private verificationRepository: Repository<VerificationCode>,
    @Inject(MAILER_TOKEN)
    private transporter: nodemailer.Transporter,
    private readonly env: EnvService,
  ) {}

  async sendVerificationCode(user: CreateUserDto): Promise<void> {
    const exists = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (exists) {
      throw new ConflictException(`Email đã được đăng ký`);
    }
    await this.verificationRepository.update(
      { email: user.email, isUsed: false },
      { isUsed: true },
    );
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 chữ số

    const codeEntity = this.verificationRepository.create({
      email: user.email,
      code,
    });
    await this.verificationRepository.save(codeEntity);

    try {
      await this.transporter.sendMail(mailOptions_Register(user, code));
    } catch (err) {
      console.error('Lỗi gửi email:', err);
      throw new InternalServerErrorException('Không thể gửi mã xác minh');
    }
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const record = await this.verificationRepository.findOne({
      where: { email, code, isUsed: false },
      order: { createdAt: 'DESC' },
    });

    if (!record) return false;

    const createdAt =
      typeof record.createdAt === 'string'
        ? parseISO(record.createdAt)
        : new Date(record.createdAt);

    const expiredAt = addMinutes(addHours(createdAt, 7), 10);
    if (isAfter(new Date(), expiredAt)) {
      return false;
    }

    record.isUsed = true;

    await this.verificationRepository.save(record);
    return true;
  }

  async register(newUser: CreateUserDto): Promise<User> {
    const isValidCode = await this.verifyCode(
      newUser.email,
      newUser.verificationCode,
    );
    if (!isValidCode) {
      throw new BadRequestException(`Mã xác minh không hợp lệ hoặc đã hết hạn`);
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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkExpiredUsers() {
    const now = new Date();
    await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ isActive: false })
      .where('isActive = :active', { active: true })
      .andWhere('isExpired < :now', { now })
      .execute();
  }
}
