import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'database/entities/movie.entity';
import { Genre } from 'database/entities/genre.entity';
import { Actor } from 'database/entities/actor.entity';
import { Director } from 'database/entities/director.entity';
import { MovieType } from 'database/entities/movie-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Genre, Actor, Director, MovieType]),
  ], // Add your entities here, e.g., Movie, Genre, etc.
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService], // Export the service if needed in other modules
})
export class MoviesModule {}
