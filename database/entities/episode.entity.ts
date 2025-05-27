import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Season } from './season.entity';

@Entity('episodes')
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  videoUrl: string;

  @Column()
  duration: string;

  @Column()
  episodeNumber: number;

  @ManyToOne(() => Season, (season) => season.episodes)
  season: Season;
}
