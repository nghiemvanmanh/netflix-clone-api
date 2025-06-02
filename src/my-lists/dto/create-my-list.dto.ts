// favorite/dto/create-favorite.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMyListDto {
  @IsString()
  @IsNotEmpty()
  userid: string;

  @IsString()
  @IsNotEmpty()
  profileid: string;

  @IsString()
  @IsNotEmpty()
  movieid: string;
}
