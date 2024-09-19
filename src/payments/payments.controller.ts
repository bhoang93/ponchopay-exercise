import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentStatus } from '../interfaces/payment.interface';

export type GetAllPaymentsQuery = {
  status?: PaymentStatus;
};

type UpdatePaymentStatusDto = { id: number; status: PaymentStatus };

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getAllPayments(@Query() query: GetAllPaymentsQuery) {
    const payments = this.paymentsService.findAll(query?.status);

    return {
      payments,
    };
  }

  @Get('total')
  getTotalForCompletedPayments() {
    const total = this.paymentsService.getCompletedPaymentsTotal();

    return {
      total,
    };
  }

  @Post('update-status')
  updatePaymentStatus(updateDto: UpdatePaymentStatusDto) {
    this.paymentsService.updatePaymentStatus(updateDto.id, updateDto.status);
  }
}
