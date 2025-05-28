import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from './genre.entity';
import { Favorite } from './favorite.entity';
import { Review } from './review.entity';
import { Actor } from './actor.entity';
import { WatchHistory } from './history.entity';
import { Director } from './director.entity';
import { Season } from './season.entity';
import { Subtitle } from './subtitle-audio.entity';
import { MovieType } from './movie-type.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  videoUrl: string;

  @Column()
  duration: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @ManyToMany(() => Genre, (genre) => genre.movies)
  @JoinTable({ name: 'movies_genres' })
  genres: Genre[];
  @ManyToMany(() => MovieType, (movieType) => movieType.movies)
  @JoinTable({ name: 'movies_movie-types' })
  movieTypes: MovieType[];
  @ManyToMany(() => Actor, (actor) => actor.movies)
  @JoinTable({ name: 'movies_actors' })
  actors: Actor[];

  @ManyToMany(() => Director, (director) => director.movies)
  @JoinTable({ name: 'movies_directors' })
  directors: Director[];

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];

  @OneToMany(() => Favorite, (fav) => fav.movie)
  favorites: Favorite[];

  @OneToMany(() => WatchHistory, (history) => history.movie)
  watchHistory: WatchHistory[];
  @OneToMany(() => Season, (season) => season.movie)
  seasons: Season[];

  @OneToMany(() => Subtitle, (subtitle) => subtitle.movie)
  subtitles: Subtitle[];
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
