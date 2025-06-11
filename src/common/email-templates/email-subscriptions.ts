import { Payment } from 'database/entities/payment.entity';
import { SubscriptionPlan } from 'database/entities/plan.entity';
import { User } from 'database/entities/user.entity';
import * as escapeHtml from 'escape-html';
export const mailOptions_Subscriptions = (
  user: User,
  plan: SubscriptionPlan,
  payment: Payment,
) => ({
  from: `"Dịch vụ của chúng tôi" <${process.env.EMAIL_USER}>`,
  to: user.email,
  subject: 'Xác nhận thanh toán thành công',
  html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2c3e50;">Xác nhận thanh toán thành công</h2>
        <p>Xin chào <strong>${escapeHtml(user.email)}</strong>,</p>
        <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi. Chúng tôi rất vui thông báo rằng bạn đã thanh toán thành công gói Netflop <strong>${escapeHtml(plan.name)}</strong>.</p>

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
