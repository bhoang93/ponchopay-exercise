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

  it('gets total for completed payments', () => {
    const initialisedPayment: Payment = {
      amount: 100,
      status: 'initialised',
      product: testProduct,
      paymentMethod: testPaymentMethod,
      user: testUser,
    };

    const completePayment1: Payment = {
      amount: 50,
      status: 'complete',
      product: testProduct,
      paymentMethod: testPaymentMethod,
      user: testUser,
    };

    const completePayment2: Payment = {
      amount: 200,
      status: 'complete',
      product: testProduct,
      paymentMethod: testPaymentMethod,
      user: testUser,
    };

    service.addPayment(initialisedPayment);
    service.addPayment(completePayment1);
    service.addPayment(completePayment2);

    expect(service.getCompletedPaymentsTotal()).toEqual(
      completePayment1.amount + completePayment2.amount,
    );
  });
});
