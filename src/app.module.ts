import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';

@Module({
  imports: [],
  controllers: [ProductsController, PaymentsController],
  providers: [ProductsService, PaymentsService],
})
export class AppModule {}
