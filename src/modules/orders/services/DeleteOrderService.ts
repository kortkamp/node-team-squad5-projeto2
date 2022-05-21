import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IOrdersRepository } from '../repositories/IOrdersRepository';

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}
  public async execute(orderId: string) {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      throw new ErrorsApp('Order not found', 404);
    }

    await this.ordersRepository.delete(order);
  }
}

export { DeleteOrderService };
