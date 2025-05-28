import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'database/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])], // Add your Genre entity here if you have one
  controllers: [GenresController],
  providers: [GenresService],
  exports: [GenresService], // Export the service if needed in other modules
})
export class GenresModule {}
