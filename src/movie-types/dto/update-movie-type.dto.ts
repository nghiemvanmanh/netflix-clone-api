import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieTypeDto } from './create-movie-type.dto';

export class UpdateMovieTypeDto extends PartialType(CreateMovieTypeDto) {}
