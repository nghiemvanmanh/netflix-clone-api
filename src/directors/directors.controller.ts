import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorService: DirectorsService) {}

  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto[]) {
    return this.directorService.create(createDirectorDto);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorService.update(id, updateDirectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorService.remove(id);
  }

  @Get()
  findAll() {
    return this.directorService.findAll();
  }

  @Get('select')
  getForSelect() {
    return this.directorService.getForSelect();
  }
}
