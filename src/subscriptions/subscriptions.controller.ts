// src/subscriptions/subscriptions.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
  Req,
  Headers,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscription.dto';
import Stripe from 'stripe';

@Controller('subscriptions')
export class SubscriptionsController {
  private stripe: Stripe;

  constructor(private readonly subscriptionsService: SubscriptionsService) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error('Missing Stripe secret key!');
    }
    this.stripe = new Stripe(stripeKey);
  }

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

  // subscription.controller.ts

  @Post('webhook')
  async handleStripeWebhook(
    @Req() req: import('express').Request,
    @Headers('stripe-signature') signature: string | string[],
  ) {
    const sig: string | undefined = Array.isArray(signature)
      ? signature[0]
      : signature;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig) {
      throw new BadRequestException('Missing Stripe signature');
    }

    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        req['rawBody'] as Buffer,
        sig,
        webhookSecret,
      );
    } catch (err: any) {
      if (err instanceof Error) {
        console.error('Webhook signature verification failed:', err.message);
        throw new BadRequestException(`Webhook error: ${err.message}`);
      }
      console.error('Webhook signature verification failed:', err);
      throw new BadRequestException(`Webhook error: ${String(err)}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await this.subscriptionsService.handleCompletedCheckoutSession(session);
    }

    return { received: true };
  }
}
