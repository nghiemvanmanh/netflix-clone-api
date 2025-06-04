// src/subscriptions/subscriptions.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body()
    body: {
      priceId: string;
      userId: string;
      planName: string;
      planId: string;
      amount: number;
    },
  ) {
    return await this.subscriptionsService.createCheckoutSession(body);
  }

  @Post('verify-payment')
  async verifyPayment(@Query('session_id') sessionId: string) {
    if (!sessionId) {
      throw new BadRequestException('Missing session_id');
    }
    return await this.subscriptionsService.verifyPayment(sessionId);
  }
  @Post()
  async createSubscriptionPlan(
    @Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto[],
  ) {
    return await this.subscriptionsService.create(createSubscriptionPlanDto);
  }

  @Get()
  async getAllSubscriptionPlans() {
    return await this.subscriptionsService.findAll();
  }
}
