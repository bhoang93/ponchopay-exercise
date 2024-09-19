import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from '../interfaces/payment.interface';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getAllPayments(): Payment[] {
    return this.paymentsService.findAll();
  }
}
