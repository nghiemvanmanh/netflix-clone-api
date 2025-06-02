import { Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from 'database/entities/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  create(createDirectorDto: CreateDirectorDto[]) {
    const director = this.directorRepository.create(createDirectorDto);
    return this.directorRepository.save(director);
  }

  update(id: string, updateDirectorDto: UpdateDirectorDto) {
    return this.directorRepository.update(id, updateDirectorDto);
  }

  remove(id: string) {
    return this.directorRepository.delete(id);
  }

  findAll() {
    return this.directorRepository.find();
  }

  async getForSelect() {
    const directors = await this.directorRepository.find();
    return directors.map((director) => ({
      value: director.id,
      label: director.name,
    }));
  }
}
