import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'database/entities/genre.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}
  async create(createGenreDto: CreateGenreDto[]) {
    const existingGenres = await this.genreRepository.findBy({
      name: In(createGenreDto.map((dto) => dto.name)),
    });
    if (existingGenres.length) {
      throw new ConflictException(
        `Genres with names ${existingGenres.map((g) => g.name).join(', ')} already exist`,
      );
    }
    const genres = this.genreRepository.create(createGenreDto);
    return this.genreRepository.save(genres);
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const existingGenre = await this.genreRepository.findOne({ where: { id } });
    if (!existingGenre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return this.genreRepository.update(id, updateGenreDto);
  }

  async remove(id: string) {
    const existingGenre = await this.genreRepository.findOne({ where: { id } });
    if (!existingGenre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return this.genreRepository.delete(id);
  }

  async getGenresForSelect() {
    const genres = await this.genreRepository.find();

    // map thành { label, value }
    return genres.map((genre) => ({
      label: genre.name,
      value: genre.id,
    }));
  }
}
