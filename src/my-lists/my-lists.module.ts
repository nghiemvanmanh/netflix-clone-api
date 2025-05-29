import { Module } from '@nestjs/common';
import { MyListsService } from './my-lists.service';
import { MyListsController } from './my-lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'database/entities/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  controllers: [MyListsController],
  providers: [MyListsService],
  exports: [MyListsService],
})
export class MyListsModule {}
