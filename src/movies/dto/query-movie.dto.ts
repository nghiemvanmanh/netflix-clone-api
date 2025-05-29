import { IsString, IsOptional } from 'class-validator';

export class QueryMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsOptional()
  movieType?: string;
}
