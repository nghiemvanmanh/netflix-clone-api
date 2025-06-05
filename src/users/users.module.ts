import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'database/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { VerificationCode } from 'database/entities/verification-code.entity';
import { mailerProvider } from 'src/mailer/mailer.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, VerificationCode]),
    AuthModule, // Import AuthModule vào đây để dùng AuthService và JwtService
  ],
  controllers: [UsersController],
  providers: [UsersService, mailerProvider],
  exports: [UsersService],
})
export class UsersModule {}
