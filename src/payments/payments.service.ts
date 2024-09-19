import { Injectable } from '@nestjs/common';
import { Payment } from '../interfaces/payment.interface';

@Injectable()
export class PaymentsService {
  private readonly payments: Payment[] = [];

  addPayment(payment: Payment) {
    this.payments.push(payment);
  }

  findAll(): Payment[] {
    return this.payments;
  }
}
