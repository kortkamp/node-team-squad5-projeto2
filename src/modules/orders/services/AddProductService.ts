import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
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

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: ICreateProductOrderDTO): Promise<IProductOrder> {
    const orderExists = await this.ordersRepository.findById(data.order_id, [
      'products',
    ]);

    if (!orderExists) {
      throw new ErrorsApp('Order not found', 404);
    }

    const product = await this.productsRepository.findById(data.product_id);

    if (!product) {
      throw new ErrorsApp('Product not found', 404);
    }

    if (data.quantity > product.quantity) {
      throw new ErrorsApp(
        `We do not have ${data.quantity} itens ${product.name} in stock, only ${product.quantity}`,
        409,
      );
    }

    product.quantity -= Number(data.quantity);

    await this.productsRepository.save(product);

    const index = orderExists.products.findIndex(
      item => item.product_id === data.product_id,
    );
    // product already is on the list
    if (index >= 0) {
      orderExists.products[index].quantity += Number(data.quantity);
      await this.productsOrderRepository.save(orderExists.products[index]);
      return orderExists.products[index];
    }
    const productOrder = await this.productsOrderRepository.create(data);

    return productOrder;
  }
}

export { AddProductService };
