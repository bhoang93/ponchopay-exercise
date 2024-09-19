export type PaymentStatus =
  | 'initialised'
  | 'user-set'
  | 'payment-taken'
  | 'complete';

export interface Payment {
  id?: number;
  amount: number;
  status: PaymentStatus;
  productId: number;
  paymentMethodId: number;
  userId: number;
}
