import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('subscription_plans')
export class SubscriptionPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // 'Cơ bản', 'Cao cấp', v.v.

  @Column({ type: 'decimal' })
  price: number;

  @Column({ default: 'VND' })
  currency: string;

  @Column({ default: 'tháng' })
  interval: string; // tháng, năm,...

  @Column()
  quality: string; // 720p, 1080p, 4K

  @Column()
  devices: number; // "1 thiết bị", "4 thiết bị"

  @Column()
  downloads: number; // "1 thiết bị", "4 thiết bị"

  @Column()
  stripePriceId: string;

  @Column({ default: false })
  popular: boolean;

  @Column('text', { array: true })
  features: string[];

  @OneToMany(() => User, (user) => user.plan)
  users: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
