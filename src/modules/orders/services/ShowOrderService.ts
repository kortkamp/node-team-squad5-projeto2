import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IOrder } from '../models/IOrder';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}
  public async execute(orderId: string): Promise<IOrder> {
    const order = await this.ordersRepository.show(orderId);

    if (!order) {
      throw new ErrorsApp('Order not found', 404);
    }

    const totalValue = order.products.reduce(
      (total, item) => total + item.quantity * item.product.value,
      0,
    );

    const totalQuantity = order.products.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    Object.assign(order, { totalValue, totalQuantity });

    return order;
  }
}

export { ShowOrderService };
