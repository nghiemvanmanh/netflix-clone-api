import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlan } from 'database/entities/plan.entity';
import { Payment } from 'database/entities/payment.entity';
import { User } from 'database/entities/user.entity';
import { mailerProvider } from 'src/mailer/mailer.providers';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlan, Payment, User])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, mailerProvider],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
