import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'database/entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}
  async create(
    createReviewDto: CreateReviewDto,
    profileId: string,
    movieId: string,
  ) {
    const comment = this.reviewRepository.create({
      ...createReviewDto,
      profile: { id: profileId },
      movie: { id: movieId },
    });
    return await this.reviewRepository.save(comment);
  }
  async findAll(movieId: string) {
    return await this.reviewRepository.find({
      where: { movie: { id: movieId } },
      relations: ['profile'],
      order: { createdAt: 'DESC' },
    });
  }
  async remove(id: string) {
    return await this.reviewRepository.delete(id);
  }
}
