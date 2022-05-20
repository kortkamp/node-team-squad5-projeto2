import { OrderStatus } from '../models/IOrder';

interface ICreateOrderDTO {
  user_id: string;
  status?: OrderStatus;
}

export { ICreateOrderDTO };
