import { Test, TestingModule } from '@nestjs/testing';
import { Payment } from '../interfaces/payment.interface';
import { PaymentsService } from './payments.service';
import { testPaymentMethod, testProduct, testUser } from '../shared/testModels';

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('adds and retrieves payments to the store', () => {
    const newPayment: Payment = {
      amount: 100,
      status: 'initialised',
      product: testProduct,
      paymentMethod: testPaymentMethod,
      user: testUser,
    };

    service.addPayment(newPayment);

    expect(service.findAll()).toEqual([newPayment]);
  });

  it('retrieves payments of the specified status', () => {
    const initialisedPayment: Payment = {
      amount: 100,
      status: 'initialised',
      product: testProduct,
      paymentMethod: testPaymentMethod,
      user: testUser,
    };

    const completePayment: Payment = {
      amount: 100,
      status: 'complete',
      product: testProduct,
      paymentMethod: testPaymentMethod,
      user: testUser,
    };

    service.addPayment(initialisedPayment);
    service.addPayment(completePayment);

    expect(service.findAll('complete')).toEqual([completePayment]);
  });
});
