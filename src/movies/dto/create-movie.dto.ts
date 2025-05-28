import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsArray,
  ArrayNotEmpty,
  IsUrl,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  thumbnailUrl: string;

  @IsUrl()
  @IsNotEmpty()
  videoUrl: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  genreIds: number[];

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  movieTypeIds: number[];

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  actorIds: number[];

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  directorIds: number[];
}
