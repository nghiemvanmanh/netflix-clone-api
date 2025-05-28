import { Module } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { DirectorsController } from './directors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from 'database/entities/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  controllers: [DirectorsController],
  providers: [DirectorsService],
  exports: [DirectorsService],
})
export class DirectorsModule {}
