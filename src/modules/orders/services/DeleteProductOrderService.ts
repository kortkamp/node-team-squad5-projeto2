import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IProductsOrderRepository } from '../repositories/IProductsOrderRepository';

interface IRequest {
  id: string;
  authUserId: string;
}

@injectable()
class DeleteProductOrderService {
  constructor(
    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({ id }: IRequest) {
    const productOrder = await this.productsOrderRepository.findById(id);

    if (!productOrder) {
      throw new ErrorsApp('Item not found', 404);
    }

    const product = await this.productsRepository.findById(
      productOrder.product_id,
    );

    product.quantity += productOrder.quantity;

    await this.productsRepository.save(product);

    await this.productsOrderRepository.delete(productOrder);
  }
}

export { DeleteProductOrderService };
