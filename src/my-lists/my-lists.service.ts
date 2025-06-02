import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'database/entities/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MyListsService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}
  async create(userId: string, profileId: string, movieId: string) {
    const existingMovie = await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        profile: { id: profileId },
        movie: { id: movieId },
      },
    });
    if (existingMovie) {
      // If the movie already exists in the user's list, return it
      throw new BadRequestException('Movies đã có trong danh sách của bạn');
    }
    const favorite = this.favoriteRepository.create({
      user: { id: userId },
      profile: { id: profileId },
      movie: { id: movieId },
    });

    return await this.favoriteRepository.save(favorite);
  }

  remove(userId: string, profileId: string, movieId: string) {
    return this.favoriteRepository.delete({
      user: { id: userId },
      profile: { id: profileId },
      movie: { id: movieId },
    });
  }

  async getMyList(userId: string, profileId: string) {
    return this.favoriteRepository.find({
      where: { user: { id: userId }, profile: { id: profileId } },
      relations: ['movie', 'movie.genres'],
    });
  }
}
