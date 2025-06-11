import * as escapeHtml from 'escape-html';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export const mailOptions_Register = (user: CreateUserDto, code: string) => ({
  from: `"Dịch vụ của chúng tôi" <${process.env.EMAIL_USER}>`,
  to: user.email,
  subject: 'Mã xác minh đăng ký tài khoản Netflop',
  html: `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        background-color: #f9f9f9; 
        padding: 20px; 
        border-radius: 10px; 
        max-width: 480px; 
        margin: auto; 
        border: 1px solid #ddd;
        color: #333;
      ">
        <h2 style="
          color: #e50914; 
          font-weight: 700; 
          text-align: center; 
          margin-bottom: 10px;
        ">
          🔒 Mã Xác Minh Đăng Ký
        </h2>
        <p>Xin chào,</p>
        <p>Bạn vừa yêu cầu mã xác minh cho việc đăng ký tài khoản Netflop. Mã xác minh của bạn là:</p>
        <div style="
          background-color: #fff; 
          border: 2px dashed #e50914; 
          padding: 15px; 
          text-align: center; 
          font-size: 28px; 
          font-weight: 700; 
          letter-spacing: 5px; 
          margin: 20px 0; 
          border-radius: 8px;
          user-select: all;
        ">
          ${escapeHtml(code)}
        </div>
        <p style="color: #555;">
          Mã này có hiệu lực trong <strong>10 phút</strong>. Vui lòng không chia sẻ mã này với người khác.
        </p>
        <p style="font-size: 12px; color: #888; text-align: center; margin-top: 30px;">
          Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.
        </p>
      </div>
    `,
});
