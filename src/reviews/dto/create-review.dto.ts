// create-review.dto.ts
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  @IsString()
  name?: string; // Tùy chọn

  @IsString()
  content: string;

  @IsInt()
  @IsOptional()
  rating?: number;
}
