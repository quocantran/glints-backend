import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  constructor(private configService: ConfigService) {}

  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async checkPayment(body: { code: string; amount: number }) {
    const { code, amount } = body;
    const PAYMENT_URL = this.configService.get<string>('PAYMENT_URL');
    const PAYMENT_API_KEY = this.configService.get<string>('PAYMENT_API_KEY');
    //Date format: yyyy-MM-dd
    const currentDate = this.getCurrentDate();
    const res = await fetch(`${PAYMENT_URL}?fromDate=${currentDate}`, {
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
