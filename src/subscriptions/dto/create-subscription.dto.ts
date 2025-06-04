import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateSubscriptionPlanDto {
  @IsString()
  name: string; // "Cơ bản", "Tiêu chuẩn", "Cao cấp"

  @IsNumber()
  price: number;

  @IsString()
  currency: string; // "VND"

  @IsString()
  interval: string; // "tháng"

  @IsString()
  quality: string; // "720p", "1080p", "4K+HDR"

  @IsNumber()
  devices: number;

  @IsNumber()
  downloads: number;

  @IsString()
  stripePriceId: string;

  @IsOptional()
  @IsBoolean()
  popular?: boolean;
}
