// src/mailer/mailer.providers.ts
import * as nodemailer from 'nodemailer';
import { Provider } from '@nestjs/common';

export const MAILER_TOKEN = 'MAIL_TRANSPORTER';
export const mailerProvider: Provider = {
  provide: MAILER_TOKEN,
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
