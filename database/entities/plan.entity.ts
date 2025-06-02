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
  name: string; // Free, Basic, Premium

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  videoQuality: string; // SD, HD, 4K

  @Column()
  maxDevices: number;

  @OneToMany(() => User, (user) => user.plan)
  users: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
