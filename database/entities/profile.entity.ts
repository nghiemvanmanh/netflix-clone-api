import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.profiles)
  user: User;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: false })
  isKids: boolean;
}
