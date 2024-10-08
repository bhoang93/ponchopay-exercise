﻿import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment, PaymentStatus } from '../interfaces/payment.interface';

export type GetAllPaymentsQuery = {
  status?: PaymentStatus;
};

type UpdatePaymentStatusDto = { id: number; status: PaymentStatus };

type CreatePaymentDto = {
  amount: number;
  productId: number;
  paymentMethodId: number;
  userId: number;
};

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

  @Put('update-status')
  updatePaymentStatus(updateDto: UpdatePaymentStatusDto) {
    this.paymentsService.updatePaymentStatus(updateDto.id, updateDto.status);
  }

  @Post()
  addPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const payment: Payment = {
      ...createPaymentDto,
      status: 'initialised',
    };
    this.paymentsService.addPayment(payment);
  }
}
