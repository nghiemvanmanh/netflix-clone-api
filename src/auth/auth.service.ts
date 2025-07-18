import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { RefreshToken } from 'database/entities/refresh-token.entity';

import { User } from 'database/entities/user.entity';
import { addDays } from 'date-fns';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      const isMatched = compareSync(password, user.password);
      if (isMatched) {
        const payload = {
          id: user.id,
          email: user.email,
          phone: user.phoneNumber,
          isActive: user.isActive,
          isAdmin: user.isAdmin,
        };

        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.sign(payload),
          this.jwtService.sign(payload, {
            expiresIn: '24h',
          }),
        ]);

        await this.refreshTokenRepository.save({
          user,
          token: refreshToken,
          expiresAt: addDays(new Date(Date.now()), 1),
        });

        return {
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
      }
    }
    throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
  }

  async refreshAccessToken(token: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: refreshToken.user.id,
      email: refreshToken.user.email,
      phone: refreshToken.user.phoneNumber,
    };
    //tra ve ma accestoken new
    return this.jwtService.sign(payload);
  }
}
