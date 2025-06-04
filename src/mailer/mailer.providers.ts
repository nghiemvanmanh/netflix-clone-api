// src/mailer/mailer.providers.ts
import * as nodemailer from 'nodemailer';
import { Provider } from '@nestjs/common';
import { EnvService } from 'src/env/env.service';

export const MAILER_TOKEN = 'MAIL_TRANSPORTER';
export const mailerProvider: Provider = {
  provide: MAILER_TOKEN,
  useFactory: (env: EnvService) => {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.get('EMAIL_USER'),
        pass: env.get('EMAIL_PASS'),
      },
    });
  },
};
