// favorite/dto/create-favorite.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMyListDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  profileId: number;

  @IsInt()
  @IsNotEmpty()
  movieId: number;
}
