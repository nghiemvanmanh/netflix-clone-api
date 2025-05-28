import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Get,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorService: ActorsService) {}

  @Post()
  create(@Body() createActorDto: CreateActorDto[]) {
    return this.actorService.create(createActorDto);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.update(id, updateActorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.actorService.remove(id);
  }
  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Get('select')
  getForSelect() {
    return this.actorService.getForSelect();
  }
}
