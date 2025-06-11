import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as getRawBody from 'raw-body';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl === '/subscriptions/webhook' && req.method === 'POST') {
      try {
        const raw = await getRawBody(req);
        req['rawBody'] = raw;
      } catch (err) {
        console.error('Error parsing raw body:', err);
        return res.status(400).send('Invalid body');
      }
    }
    next();
  }
}
