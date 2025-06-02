import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Episode } from './episode.entity';

@Entity('seasons')
export class Season {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seasonNumber: number;

  @ManyToOne(() => Movie, (movie) => movie.seasons)
  movie: Movie;

  @OneToMany(() => Episode, (episode) => episode.season)
  episodes: Episode[];
}
