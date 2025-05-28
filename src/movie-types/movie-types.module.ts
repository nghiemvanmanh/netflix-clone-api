import { Module } from '@nestjs/common';
import { MovieTypesService } from './movie-types.service';
import { MovieTypesController } from './movie-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieType } from 'database/entities/movie-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieType])], // Add your MovieType entity here if you have one
  controllers: [MovieTypesController],
  providers: [MovieTypesService],
})
export class MovieTypesModule {}
