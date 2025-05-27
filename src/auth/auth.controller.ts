import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/custompublic';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
  @Post('refresh')
  async RefreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;

    // Gọi service để làm mới access token
    const newAccessToken =
      await this.authService.refreshAccessToken(refreshToken);

    if (!newAccessToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Trả về access token mới
    return {
      accessToken: newAccessToken,
    };
  }
}
