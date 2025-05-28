import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieTypesService } from './movie-types.service';
import { CreateMovieTypeDto } from './dto/create-movie-type.dto';
import { UpdateMovieTypeDto } from './dto/update-movie-type.dto';

@Controller('movie-types')
export class MovieTypesController {
  constructor(private readonly movieTypesService: MovieTypesService) {}

  @Post()
  create(@Body() createMovieTypeDto: CreateMovieTypeDto[]) {
    return this.movieTypesService.create(createMovieTypeDto);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieTypeDto: UpdateMovieTypeDto,
  ) {
    return this.movieTypesService.update(+id, updateMovieTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieTypesService.remove(+id);
  }

  @Get('select')
  getMovieTypesForSelect() {
    return this.movieTypesService.getMovieTypesForSelect();
  }
}
