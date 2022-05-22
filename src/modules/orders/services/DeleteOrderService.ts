import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IOrdersRepository } from '../repositories/IOrdersRepository';

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute(orderId: string) {
    const order = await this.ordersRepository.findById(orderId, ['products']);

    if (!order) {
      throw new ErrorsApp('Order not found', 404);
    }

    // return all products to stock
    const returnProducts = order.products.map(async productOrder => {
      const product = await this.productsRepository.findById(
        productOrder.product_id,
      );

      product.quantity += productOrder.quantity;

      await this.productsRepository.save(product);
    });

    Promise.all(returnProducts);

    await this.ordersRepository.delete(order);
  }
}

export { DeleteOrderService };
