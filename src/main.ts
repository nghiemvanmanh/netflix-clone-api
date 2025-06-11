import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtAuthGuard } from './auth/guard/auth.guard';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { RefreshToken } from 'database/entities/refresh-token.entity';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvService } from './env/env.service';
import { RawBodyMiddleware } from './middleware/raw-body.middleware';
import { Repository } from 'typeorm';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(EnvService);
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  const refreshTokenRepository = app.get<Repository<RefreshToken>>(
    getRepositoryToken(RefreshToken),
  );
  const prefix = env.get('PREFIX');
  app.setGlobalPrefix(prefix); // Thiết lập tiền tố toàn cục cho các route
  app.useGlobalGuards(
    new JwtAuthGuard(reflector, jwtService, refreshTokenRepository),
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: env.get('FRONTEND_URL'),
    // Cho phép từ Next.js
    credentials: true, // Nếu dùng cookies hay headers đặc biệt
  });
  // Cấu hình swagger
  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description')
    .setVersion('1.0')
    // Nếu bạn có auth (bearer), có thể config thêm:
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Thư mục /api sẽ chứa swagger UI
  app.use(new RawBodyMiddleware().use.bind(new RawBodyMiddleware()));
  await app.listen(env.get('PORT'), '0.0.0.0').catch((err) => {
    console.error('Error starting server:', err);
  });
}
void bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
