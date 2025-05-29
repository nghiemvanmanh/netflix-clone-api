import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MyListsService } from './my-lists.service';

@Controller('users/:userId/profiles/:profileId/my-lists')
export class MyListsController {
  constructor(private readonly myListsService: MyListsService) {}

  @Get()
  getListMovie(@Param() params: { userId: number; profileId: number }) {
    return this.myListsService.getMyList(params.userId, params.profileId);
  }

  @Post()
  create(
    @Param() params: { userId: number; profileId: number },
    @Body() { movieId }: { movieId: number },
  ) {
    return this.myListsService.create(params.userId, params.profileId, movieId);
  }

  @Delete(':movieId')
  deleteMovie(
    @Param() params: { userId: number; profileId: number; movieId: number },
  ) {
    return this.myListsService.remove(
      params.userId,
      params.profileId,
      params.movieId,
    );
  }
}
