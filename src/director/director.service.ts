import { Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from 'database/entities/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  create(createDirectorDto: CreateDirectorDto) {
    const director = this.directorRepository.create(createDirectorDto);
    return this.directorRepository.save(director);
  }

  update(id: number, updateDirectorDto: UpdateDirectorDto) {
    return this.directorRepository.update(id, updateDirectorDto);
  }

  remove(id: number) {
    return this.directorRepository.delete(id);
  }

  findAll() {
    return this.directorRepository.find();
  }
}
