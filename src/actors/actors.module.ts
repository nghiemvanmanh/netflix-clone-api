import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { Actor } from 'database/entities/actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorsController],
  providers: [ActorsService],
  exports: [ActorsService],
})
export class ActorsModule {}
