import { GetAllPaymentsQuery, PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    paymentsService = new PaymentsService();
    paymentsController = new PaymentsController(paymentsService);
  });

  describe('addPayment', () => {
    it('creates a new payment', () => {
      const addPayment = jest.spyOn(paymentsService, 'addPayment');

      const createPaymentDto = {
        amount: 10,
        productId: 1,
        userId: 1,
        paymentMethodId: 1,
      };
      paymentsController.addPayment(createPaymentDto);

      const expected = {
        ...createPaymentDto,
        status: 'initialised',
      };

      expect(addPayment).toBeCalledWith(expected);
    });
  });

  describe('getAllPayments', () => {
    it('should return all payments', () => {
      const allPayments = [
        {
          id: 1,
          amount: 100,
          status: 'initialised' as const,
          productId: 1,
          paymentMethodId: 1,
          userId: 1,
        },
      ];

      jest
        .spyOn(paymentsService, 'findAll')
        .mockImplementation(() => allPayments);

      const expected = {
        payments: allPayments,
      };

      expect(paymentsController.getAllPayments({})).toStrictEqual(expected);
    });

    it('should return all payments of the specified status', () => {
      const completePayment = {
        id: 1,
        amount: 100,
        status: 'complete' as const,
        productId: 1,
        paymentMethodId: 1,
        userId: 1,
      };

      const filteredPayments = [completePayment];

      const query: GetAllPaymentsQuery = { status: 'complete' as const };

      const findAll = jest
        .spyOn(paymentsService, 'findAll')
        .mockImplementation(() => filteredPayments);

      const expected = {
        payments: filteredPayments,
      };

      expect(paymentsController.getAllPayments(query)).toStrictEqual(expected);

      expect(findAll).toBeCalledWith(query.status);
    });
  });

  describe('getTotalForCompletedPayments', () => {
    it('should return total for completed payments', () => {
      const total = 100;

      jest
        .spyOn(paymentsService, 'getCompletedPaymentsTotal')
        .mockReturnValue(total);

      expect(paymentsController.getTotalForCompletedPayments()).toEqual({
        total,
      });
    });
  });

  describe('updatePaymentStatus', () => {
    it('updates the payment status', () => {
      const updateDto = { id: 1, status: 'complete' as const };

      const updatePaymentStatus = jest.spyOn(
        paymentsService,
        'updatePaymentStatus',
      );

      paymentsController.updatePaymentStatus(updateDto);

      expect(updatePaymentStatus).toBeCalledWith(
        updateDto.id,
        updateDto.status,
      );
    });
  });
});
