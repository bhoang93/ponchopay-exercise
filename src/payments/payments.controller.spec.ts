import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { testPaymentMethod, testProduct, testUser } from '../shared/testModels';

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    paymentsService = new PaymentsService();
    paymentsController = new PaymentsController(paymentsService);
  });

  it('should return all products', () => {
    const allPayments = [
      {
        amount: 100,
        status: 'initialised' as const,
        product: testProduct,
        paymentMethod: testPaymentMethod,
        user: testUser,
      },
    ];

    jest
      .spyOn(paymentsService, 'findAll')
      .mockImplementation(() => allPayments);

    expect(paymentsController.getAllPayments()).toStrictEqual(allPayments);
  });
});
