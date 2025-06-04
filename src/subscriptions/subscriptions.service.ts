import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateSubscriptionPlanDto } from './dto/create-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionPlan } from 'database/entities/plan.entity';
import { Repository } from 'typeorm';
import { Payment } from 'database/entities/payment.entity';
import { User } from 'database/entities/user.entity';
import * as nodemailer from 'nodemailer';
import * as escapeHtml from 'escape-html';
@Injectable()
export class SubscriptionsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(SubscriptionPlan)
    private subscriptionRepository: Repository<SubscriptionPlan>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject('MAIL_TRANSPORTER')
    private readonly transporter: nodemailer.Transporter,
  ) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error('Missing Stripe secret key!');
    }
    this.stripe = new Stripe(stripeKey);
  }

  async createCheckoutSession(data: {
    priceId: string;
    userId: string;
    planName: string;
    planId: string;
    amount: number;
  }): Promise<{ sessionId: string }> {
    try {
      const { priceId, userId, planName, planId, amount } = data;
      // Tạo session Stripe
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        // Thông tin khách hàng có thể lưu metadata để dùng về sau
        metadata: {
          userId,
          planName,
          planId,
          amount,
        },
        success_url: `${process.env.FRONTEND_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/subscription/cancel`,
      });

      return { sessionId: session.id };
    } catch (error) {
      throw new BadRequestException(
        `Failed to create checkout session: ${error}`,
      );
    }
  }

  async verifyPayment(sessionId: string): Promise<{
    success: boolean;
    paymentId?: string;
    planName?: string;
    planText?: string[];
  }> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['customer', 'payment_intent'],
      });

      if (!session || session.payment_status !== 'paid') {
        return { success: false };
      }

      const existingPayment = await this.paymentRepository.findOne({
        where: { stripeSessionId: sessionId },
        relations: ['plan'],
      });
      if (existingPayment)
        return {
          success: true,
          paymentId: existingPayment.id,
          planName: existingPayment.plan.name,
          planText: existingPayment.plan.features,
        };

      const { userId, planId } = session.metadata ?? {};
      if (!userId || !planId) {
        throw new BadRequestException('Missing metadata (userId or planId)');
      }

      // Lấy user và plan song song
      const [user, plan] = await Promise.all([
        this.userRepository.findOne({ where: { id: userId } }),
        this.subscriptionRepository.findOne({ where: { id: planId } }),
      ]);
      if (!user || !plan) {
        throw new BadRequestException('User or Plan not found');
      }

      const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

      const payment = this.paymentRepository.create({
        user,
        plan,
        amount: session.amount_total,
        currency: session.currency,
        status: session.payment_status,
        stripeSessionId: session.id,
        stripePaymentIntentId: paymentIntent?.id ?? null,
        paymentMethod: paymentIntent?.payment_method_types?.[0] ?? null,
      });

      // Lưu payment và cập nhật user active song song
      await Promise.all([
        this.paymentRepository.save(payment),
        (async () => {
          user.isActive = true;
          await this.userRepository.save(user);
        })(),
      ]);

      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Xác nhận thanh toán thành công',
        html: `
        <h3>Chào ${escapeHtml(user.email)},</h3>
        <p>Bạn đã thanh toán thành công gói <strong>${escapeHtml(plan.name)}</strong>.</p>
        <p><strong>Số tiền:</strong> ${payment.amount} ${payment.currency.toUpperCase()}</p>
        <p><strong>Thời gian:</strong> ${new Date().toLocaleString('vi-VN')}</p>
        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
      `,
      });

      return {
        success: true,
        paymentId: payment.id,
        planName: plan.name,
        planText: plan.features,
      };
    } catch (error) {
      console.error('Verify payment error:', error);
      throw new BadRequestException(
        `Failed to verify payment: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto[]) {
    // Validate and process the DTO
    return await this.subscriptionRepository.save(createSubscriptionPlanDto);
  }

  async findAll() {
    return await this.subscriptionRepository.find();
  }
}
