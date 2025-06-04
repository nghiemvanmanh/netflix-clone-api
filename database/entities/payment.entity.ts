import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { SubscriptionPlan } from './plan.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @ManyToOne(() => SubscriptionPlan)
  plan: SubscriptionPlan;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ length: 10 })
  currency: string; // VND, USD, etc.

  @Column({ default: 'pending' })
  status: string; // succeeded, failed, canceled, etc.

  @Column({ nullable: true })
  stripeSessionId: string;

  @Column({ nullable: true })
  stripePaymentIntentId: string;

  @Column({ nullable: true })
  paymentMethod: string; // card, paypal, etc.

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
