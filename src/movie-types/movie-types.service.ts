import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMovieTypeDto } from './dto/create-movie-type.dto';
import { UpdateMovieTypeDto } from './dto/update-movie-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieType } from 'database/entities/movie-type.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class MovieTypesService {
  constructor(
    @InjectRepository(MovieType)
    private movieTypeRepository: Repository<MovieType>,
  ) {}
  async create(createMovieTypeDto: CreateMovieTypeDto[]) {
    const existingMovieTypes = await this.movieTypeRepository.findBy({
      name: In(createMovieTypeDto.map((dto) => dto.name)),
    });
    if (existingMovieTypes.length) {
      throw new ConflictException(
        `Thể loại phim ${existingMovieTypes.map((mt) => mt.name).join(', ')} đã tồn tại`,
      );
    }
    const movieTypes = this.movieTypeRepository.create(createMovieTypeDto);
    return this.movieTypeRepository.save(movieTypes);
  }

  async update(id: string, updateMovieTypeDto: UpdateMovieTypeDto) {
    await this.movieTypeRepository.update(id, updateMovieTypeDto);
    return this.movieTypeRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.movieTypeRepository.delete(id);
  }

  async getMovieTypesForSelect() {
    const movieTypes = await this.movieTypeRepository.find();

    // map thành { label, value }
    return movieTypes.map((movieType) => ({
      label: movieType.name,
      value: movieType.id,
    }));
  }
}
