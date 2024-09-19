import { Injectable } from '@nestjs/common';
import { Payment, PaymentStatus } from '../interfaces/payment.interface';

@Injectable()
export class PaymentsService {
  private readonly payments: Payment[] = [];

  addPayment(payment: Payment) {
    this.payments.push(payment);
  }

  findAll(status?: PaymentStatus): Payment[] {
    return status
      ? this.payments.filter((payment) => payment.status === status)
      : this.payments;
  }

  getCompletedPaymentsTotal() {
    return this.payments.reduce((total, payment) => {
      return payment.status === 'complete' ? total + payment.amount : total;
    }, 0);
  }
}
