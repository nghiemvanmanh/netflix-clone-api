import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity('watch_histories')
export class WatchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.watchHistory)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.watchHistory)
  movie: Movie;

  @Column()
  watchedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
