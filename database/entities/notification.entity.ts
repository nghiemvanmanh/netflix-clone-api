import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { typeNotification } from 'src/common/enums/enum';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @Column({ type: 'enum', enum: typeNotification })
  type: typeNotification;

  @Column({ nullable: true })
  title: string;
  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  movieId: string;

  @Column({ nullable: true })
  movieTitle: string;

  @Column({ nullable: true })
  movieImage: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
