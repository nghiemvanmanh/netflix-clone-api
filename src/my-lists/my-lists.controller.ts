import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MyListsService } from './my-lists.service';

@Controller('users/:userId/profiles/:profileId/my-lists')
export class MyListsController {
  constructor(private readonly myListsService: MyListsService) {}

  @Get()
  getListMovie(@Param() params: { userId: string; profileId: string }) {
    return this.myListsService.getMyList(params.userId, params.profileId);
  }

  @Post()
  create(
    @Param() params: { userId: string; profileId: string },
    @Body() { movieId }: { movieId: string },
  ) {
    return this.myListsService.create(params.userId, params.profileId, movieId);
  }

  @Delete(':movieId')
  deleteMovie(
    @Param() params: { userId: string; profileId: string; movieId: string },
  ) {
    return this.myListsService.remove(
      params.userId,
      params.profileId,
      params.movieId,
    );
  }
}
