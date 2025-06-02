import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsArray,
  ArrayNotEmpty,
  IsUrl,
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
  @IsOptional()
  videoUrl: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  genreIds: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  movieTypeIds: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  actorIds: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  directorIds: string[];
}
