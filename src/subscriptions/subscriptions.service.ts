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
import { MAILER_TOKEN } from 'src/mailer/mailer.providers';
import { EnvService } from 'src/env/env.service';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class SubscriptionsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(SubscriptionPlan)
    private subscriptionRepository: Repository<SubscriptionPlan>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(MAILER_TOKEN)
    private transporter: nodemailer.Transporter,

    private env: EnvService,
  ) {
    const stripeKey = this.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('Missing Stripe secret key!');
    }
    this.stripe = new Stripe(stripeKey);
  }
  /**
   * Tạo JWT token cho người dùng
   * @param user Người dùng đã đăng nhập
   * @returns JWT token
   */
  private createJwtToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      phone: user.phoneNumber,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    };

    return jwt.sign(payload, this.env.get('SECRET_KEY'), {
      expiresIn: '1h',
    });
  }
  /**
   * Gửi email xác nhận thanh toán thành công
   * @param user Người dùng đã thanh toán
   * @param plan Gói đăng ký đã thanh toán
   * @param payment Thông tin thanh toán
   */
  private async sendPaymentConfirmationEmail(
    user: User,
    plan: SubscriptionPlan,
    payment: Payment,
  ) {
    await this.transporter.sendMail({
      from: `"Dịch vụ của chúng tôi" <${this.env.get('EMAIL_USER')}>`,
      to: user.email,
      subject: 'Xác nhận thanh toán thành công',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2c3e50;">Xác nhận thanh toán thành công</h2>
        <p>Xin chào <strong>${escapeHtml(user.email)}</strong>,</p>
        <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Chúng tôi rất vui thông báo rằng bạn đã thanh toán thành công gói Netflix <strong>${escapeHtml(plan.name)}</strong>.</p>

        <table style="width: 100%; max-width: 400px; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Số tiền:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${payment.amount} ${payment.currency.toUpperCase()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Thời gian:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString('vi-VN')}</td>
          </tr>
        </table>

        <p>Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, xin vui lòng liên hệ với chúng tôi qua email này.</p>

        <p style="margin-top: 30px;">Trân trọng,<br /><strong>Đội ngũ hỗ trợ khách hàng</strong></p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;" />

        <small style="color: #999;">
          Đây là email tự động, vui lòng không trả lời email này.
        </small>
      </div>
    `,
    });
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
        success_url: `${this.env.get('FRONTEND_URL')}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.env.get('FRONTEND_URL')}/subscription/cancel`,
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
    accessToken?: string;
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
        relations: ['plan', 'user'],
      });

      if (existingPayment) {
        const accessToken = this.createJwtToken(existingPayment.user);
        return {
          success: true,
          paymentId: existingPayment.id,
          planName: existingPayment.plan.name,
          planText: existingPayment.plan.features,
          accessToken,
        };
      }

      const { userId, planId } = session.metadata ?? {};
      if (!userId || !planId) {
        throw new BadRequestException('Missing metadata (userId or planId)');
      }

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

      user.isActive = true;
      await Promise.all([
        this.paymentRepository.save(payment),
        this.userRepository.save(user),
      ]);

      await this.sendPaymentConfirmationEmail(user, plan, payment);

      const accessToken = this.createJwtToken(user);

      return {
        success: true,
        paymentId: payment.id,
        planName: plan.name,
        planText: plan.features,
        accessToken,
      };
    } catch (error) {
      console.error('Verify payment error:', error);
      throw new BadRequestException(
        `Failed to verify payment: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
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
