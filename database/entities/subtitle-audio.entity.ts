import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from './movie.entity';
import { typeAudioMovie } from 'src/common/enums/enum';

@Entity('subtitles')
export class Subtitle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.subtitles)
  movie: Movie;

  @Column()
  language: string;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: typeAudioMovie, default: typeAudioMovie.SUB })
  type: typeAudioMovie;
}
