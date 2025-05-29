import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'database/entities/movie.entity';
import { Genre } from 'database/entities/genre.entity';
import { Repository } from 'typeorm';
import { MovieType } from 'database/entities/movie-type.entity';
import { Actor } from 'database/entities/actor.entity';
import { Director } from 'database/entities/director.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(MovieType)
    private readonly movieTypeRepository: Repository<MovieType>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}
  async create(dto: CreateMovieDto) {
    const genres = await this.genreRepository.findByIds(dto.genreIds);
    const movieTypes = await this.movieTypeRepository.findByIds(
      dto.movieTypeIds,
    );
    const actors = await this.actorRepository.findByIds(dto.actorIds);
    const directors = await this.directorRepository.findByIds(dto.directorIds);

    const movie = this.movieRepository.create({
      ...dto,
      releaseDate: new Date(dto.releaseDate),
      genres,
      movieTypes,
      actors,
      directors,
    });

    return await this.movieRepository.save(movie);
  }
  // ...existing code...
  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new Error('Movie not found');
    }

    // Lấy các entity liên quan
    const genres = updateMovieDto.genreIds
      ? await this.genreRepository.findByIds(updateMovieDto.genreIds)
      : [];
    const movieTypes = updateMovieDto.movieTypeIds
      ? await this.movieTypeRepository.findByIds(updateMovieDto.movieTypeIds)
      : [];
    const actors = updateMovieDto.actorIds
      ? await this.actorRepository.findByIds(updateMovieDto.actorIds)
      : [];
    const directors = updateMovieDto.directorIds
      ? await this.directorRepository.findByIds(updateMovieDto.directorIds)
      : [];

    // Gán lại các trường
    Object.assign(movie, {
      ...updateMovieDto,
      releaseDate: new Date(updateMovieDto.releaseDate),
      genres,
      movieTypes,
      actors,
      directors,
    });

    // Lưu lại entity, TypeORM sẽ cập nhật bảng trung gian
    return this.movieRepository.save(movie);
  }
  // ...existing code...

  remove(id: number) {
    return this.movieRepository.delete(id);
  }

  async findAll() {
    return this.movieRepository.find({
      relations: ['genres', 'movieTypes', 'actors', 'directors'],
    });
  }
}
