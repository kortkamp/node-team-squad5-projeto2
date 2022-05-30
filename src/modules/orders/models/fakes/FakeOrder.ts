import { ProductOrder } from '@modules/orders/infra/typeorm/models/ProductOrder';
import { v4 as uuid } from 'uuid';
import { IOrder, OrderStatus } from '../IOrder';
import { IProductOrder } from '../IProductOrder';

class FakeOrder implements IOrder {
  id: string;
  user_id: string;
  status: OrderStatus;
  products: IProductOrder[];
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.id = uuid();
    this.user_id = uuid();
    this.status = OrderStatus.OPEN;
    this.products = [new ProductOrder()];
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeOrder };
