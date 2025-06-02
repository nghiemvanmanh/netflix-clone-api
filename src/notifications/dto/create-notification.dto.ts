// src/notifications/dto/create-notification.dto.ts

import { IsString, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { typeNotification } from 'src/common/enums/enum';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsEnum(typeNotification)
  type: typeNotification; // hoặc bạn có thể dùng enum

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @IsString()
  @IsOptional()
  movieId?: string;

  @IsString()
  @IsOptional()
  movieTitle?: string;

  @IsString()
  @IsOptional()
  movieImage?: string;
}
