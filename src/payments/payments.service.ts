import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  constructor(private configService: ConfigService) {}

  async checkPayment(body: { code: string; amount: number }) {
    const { code, amount } = body;
    const PAYMENT_URL = this.configService.get<string>('PAYMENT_URL');
    const PAYMENT_API_KEY = this.configService.get<string>('PAYMENT_API_KEY');

    const res = await fetch(PAYMENT_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `apikey ${PAYMENT_API_KEY}`,
      },
    });

    const data = await res.json();
    const recordsPaid = data.data.records;

    for (const record of recordsPaid) {
      if (record.amount >= amount && record.description.includes(code)) {
        return {
          status: 'success',
          transaction_status: 1,
        };
      }
    }

    return {
      status: 'success',
      transaction_status: 0,
    };
  }
}
