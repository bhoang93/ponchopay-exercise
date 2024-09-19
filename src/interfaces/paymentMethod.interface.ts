import { User } from './user.interface';

export interface PaymentMethod {
  user: User;
  cardNumber: number;
}
