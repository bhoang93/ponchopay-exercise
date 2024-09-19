import { Product } from './product.interface';
import { PaymentMethod } from './paymentMethod.interface';
import { User } from './user.interface';

export type PaymentStatus =
  | 'initialised'
  | 'user-set'
  | 'payment-taken'
  | 'complete';

export interface Payment {
  id: number;
  amount: number;
  status: PaymentStatus;
  product: Product;
  paymentMethod: PaymentMethod;
  user: User;
}
