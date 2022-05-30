import { v4 as uuid } from 'uuid';

import { IProduct } from '@modules/products/models/IProduct';
import { FakeProduct } from '@modules/products/models/fakes/FakeProduct';
import { IProductOrder } from '../IProductOrder';

import { OrderStatus } from '../IOrder';

class FakeProductOrder implements IProductOrder {
  id: string;
  order_id: string;
  product_id: string;
  product: IProduct;
  quantity: number;

  constructor() {
    const fakeProduct = new FakeProduct();

    this.id = uuid();
    this.order_id = OrderStatus.OPEN;
    this.product_id = fakeProduct.id;
    this.product = fakeProduct;
    this.quantity = Math.floor(Math.random() * 100);
  }
}

export { FakeProductOrder };
