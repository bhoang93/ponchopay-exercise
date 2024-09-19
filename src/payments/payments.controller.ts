﻿import { Controller, Get, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment, PaymentStatus } from '../interfaces/payment.interface';

export class GetAllPaymentsQuery {
  status?: PaymentStatus;
}

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
}
