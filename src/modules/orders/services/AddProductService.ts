import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateProductOrderDTO } from '../dtos/ICreateProductOrderDTO';
import { IProductOrder } from '../models/IProductOrder';
import { IOrdersRepository } from '../repositories/IOrdersRepository';
import { IProductsOrderRepository } from '../repositories/IProductsOrderRepository';

@injectable()
class AddProductService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,
  ) {}

  public async execute(data: ICreateProductOrderDTO): Promise<IProductOrder> {
    const orderExists = await this.ordersRepository.findById(data.order_id, [
      'products',
    ]);

    if (!orderExists) {
      throw new ErrorsApp('Order not found', 404);
    }

    const order = await this.productsOrderRepository.create(data);

    return order;
  }
}

export { AddProductService };
