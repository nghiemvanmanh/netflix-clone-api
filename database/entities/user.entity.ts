import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Favorite } from './favorite.entity';
import { Review } from './review.entity';
import { SubscriptionPlan } from './plan.entity';
import { WatchHistory } from './history.entity';
import { Payment } from './payment.entity';
import { Profile } from './profile.entity';
import { Notification } from './notification.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  @Column()
  phoneNumber: string;
  @Column({ default: false })
  isAdmin: boolean;
  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => Favorite, (fav) => fav.user)
  favorites: Favorite[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => WatchHistory, (history) => history.user)
  watchHistory: WatchHistory[];

  @ManyToOne(() => SubscriptionPlan)
  plan: SubscriptionPlan;

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles: Profile[];
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
