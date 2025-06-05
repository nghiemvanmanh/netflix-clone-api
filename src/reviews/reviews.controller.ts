import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews/movies')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/:movieId/profiles/:profileId')
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Param('profileId') profileId: string,
    @Param('movieId') movieId: string,
  ) {
    return this.reviewsService.create(createReviewDto, profileId, movieId);
  }

  @Get(':movieId')
  findAll(@Param('movieId') movieId: string) {
    return this.reviewsService.findAll(movieId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
