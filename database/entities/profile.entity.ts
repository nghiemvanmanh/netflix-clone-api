import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Favorite } from './favorite.entity';
import { Notification } from './notification.entity';
import { WatchHistory } from './history.entity';
import { Review } from './review.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.profiles)
  user: User;

  @OneToMany(() => Notification, (notification) => notification.profile, {
    onDelete: 'CASCADE',
  })
  notifications: Notification[];
  @OneToMany(() => Favorite, (favorite) => favorite.profile)
  favorites: Favorite[];

  @OneToMany(() => WatchHistory, (history) => history.profile)
  watchHistory: WatchHistory[];

  @ManyToOne(() => Review, (review) => review.profile, {
    onDelete: 'CASCADE',
  })
  reviews: Review[];
  @Column()
  name: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: false })
  isKids: boolean;
}
