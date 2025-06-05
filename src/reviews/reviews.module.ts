import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'database/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review])], // Add your Review entity here
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
