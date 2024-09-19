import { Test, TestingModule } from '@nestjs/testing';
import { Payment } from '../interfaces/payment.interface';
import { PaymentsService } from './payments.service';

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
      id: 1,
      amount: 100,
      status: 'initialised',
      productId: 1,
      paymentMethodId: 1,
      userId: 1,
    };

    service.addPayment(newPayment);

    expect(service.findAll()).toEqual([newPayment]);
  });

  it('retrieves payments of the specified status', () => {
    const initialisedPayment: Payment = {
      id: 1,
      amount: 100,
      status: 'initialised',
      productId: 1,
      paymentMethodId: 1,
      userId: 1,
    };

    const completePayment: Payment = {
      id: 2,
      amount: 100,
      status: 'complete',
      productId: 1,
      paymentMethodId: 1,
      userId: 1,
    };

    service.addPayment(initialisedPayment);
    service.addPayment(completePayment);

    expect(service.findAll('complete')).toEqual([completePayment]);
  });

  it('gets total for completed payments', () => {
    const initialisedPayment: Payment = {
      id: 1,
      amount: 100,
      status: 'initialised',
      productId: 1,
      paymentMethodId: 1,
      userId: 1,
    };

    const completePayment1: Payment = {
      id: 2,
      amount: 50,
      status: 'complete',
      productId: 1,
      paymentMethodId: 1,
      userId: 1,
    };

    const completePayment2: Payment = {
      id: 3,
      amount: 200,
      status: 'complete',
      productId: 1,
      paymentMethodId: 1,
      userId: 1,
    };

    service.addPayment(initialisedPayment);
    service.addPayment(completePayment1);
    service.addPayment(completePayment2);

    expect(service.getCompletedPaymentsTotal()).toEqual(
      completePayment1.amount + completePayment2.amount,
    );
  });

  it('updates the status of a payment', () => {
    const payment: Payment = {
      id: 1,
      amount: 100,
      status: 'initialised',
      productId: 1,
      paymentMethodId: 1,
      userId: 1,
    };
    service.addPayment(payment);

    const newStatus = 'user-set';

    service.updatePaymentStatus(payment.id, newStatus);

    const result = service.findAll()[0];

    expect(result.status).toBe(newStatus);
  });
});
