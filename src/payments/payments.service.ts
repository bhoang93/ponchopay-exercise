import { Injectable } from '@nestjs/common';
import { Payment, PaymentStatus } from '../interfaces/payment.interface';

@Injectable()
export class PaymentsService {
  private readonly payments: Payment[] = [];

  addPayment(payment: Payment) {
    this.payments.push({ ...payment, id: this.payments.length + 1 });
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

  updatePaymentStatus(id: number, newStatus: PaymentStatus) {
    const payment = this.payments.find((payment) => payment.id === id);
    if (payment) {
      payment.status = newStatus;
    }
  }
}
