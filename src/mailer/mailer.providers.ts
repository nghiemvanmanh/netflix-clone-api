// src/mailer/mailer.providers.ts
import * as nodemailer from 'nodemailer';
import { Provider } from '@nestjs/common';

export const mailerProvider: Provider = {
  provide: 'MAIL_TRANSPORTER',
  useFactory: () => {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  },
};
