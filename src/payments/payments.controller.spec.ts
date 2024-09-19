import { GetAllPaymentsQuery, PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { testPaymentMethod, testProduct, testUser } from '../shared/testModels';

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    paymentsService = new PaymentsService();
    paymentsController = new PaymentsController(paymentsService);
  });

  it('should return all payments', () => {
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

    expect(paymentsController.getAllPayments({})).toStrictEqual(allPayments);
  });

  it('should return all payments of the specified status', () => {
    const completePayment = {
      amount: 100,
      status: 'complete' as const,
      product: testProduct,
      paymentMethod: testPaymentMethod,
      user: testUser,
    };

    const filteredPayments = [completePayment];

    const query: GetAllPaymentsQuery = { status: 'complete' as const };

    const findAll = jest
      .spyOn(paymentsService, 'findAll')
      .mockImplementation(() => filteredPayments);

    expect(paymentsController.getAllPayments(query)).toStrictEqual(
      filteredPayments,
    );

    expect(findAll).toBeCalledWith(query.status);
  });

  it('should return total for completed payments', () => {
    const total = 100;

    const findAll = jest
      .spyOn(paymentsService, 'getCompletedPaymentsTotal')
      .mockReturnValue(total);

    expect(paymentsController.getTotalForCompletedPayments()).toEqual(total);
  });
});
