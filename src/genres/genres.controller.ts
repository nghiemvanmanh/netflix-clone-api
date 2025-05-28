import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Get,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto[]) {
    return this.genreService.create(createGenreDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.genreService.remove(id);
  }

  @Get('select')
  getGenresForSelect() {
    return this.genreService.getGenresForSelect();
  }
}
