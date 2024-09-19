import { Test, TestingModule } from '@nestjs/testing';
import { Payment } from '../interfaces/payment.interface';
import { PaymentsService } from './payments.service';

const testUser = {
  name: 'Bobby tables',
  email: 'bobby@tables.com',
};

const testPaymentMethod = {
  user: testUser,
  cardNumber: 555,
};

const testProduct = {
  name: 'new product',
  description: 'test',
  price: 11.99,
  stockLevel: 0,
};

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
});
