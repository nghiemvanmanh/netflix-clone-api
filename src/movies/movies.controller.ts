import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { QueryMovieDto } from './dto/query-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }

  @Get()
  findAll(@Query() query: QueryMovieDto) {
    return this.movieService.findAll(query);
  }

  @Get(':id')
  getMovieById(@Param('id') id: string) {
    return this.movieService.getMovieById(id);
  }

  @Get('/:movieId/similar')
  getSimilarMovies(@Param('movieId') movieId: string) {
    return this.movieService.getsimilarMovies(movieId);
  }
}
