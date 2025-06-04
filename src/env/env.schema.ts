import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';

enum Environment {
  development = 'development',
  production = 'production',
}

export class EnvSchema {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  PORT: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  SECRET_KEY: string;

  @IsString()
  JWT_EXPIRES_IN: string;

  @IsString()
  PREFIX: string;

  @IsString()
  STRIPE_SECRET_KEY: string;

  @IsString()
  FRONTEND_URL: string;

  @IsString()
  EMAIL_USER: string;

  @IsString()
  EMAIL_PASS: string;

  @IsString()
  DB_SCHEMA: string;
}
