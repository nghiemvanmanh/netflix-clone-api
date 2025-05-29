import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Favorite } from './favorite.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.profiles)
  user: User;

  @OneToMany(() => Favorite, (favorite) => favorite.profile)
  favorites: Favorite[];

  @Column()
  name: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: false })
  isKids: boolean;
}
