import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsBoolean()
  @IsOptional()
  isKids?: boolean;
}
