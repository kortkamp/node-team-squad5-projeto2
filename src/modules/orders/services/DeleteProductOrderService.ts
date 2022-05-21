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
  ) {}
  public async execute({ id }: IRequest) {
    const item = await this.productsOrderRepository.findById(id);

    if (!item) {
      throw new ErrorsApp('Item not found', 404);
    }

    await this.productsOrderRepository.delete(item);
  }
}

export { DeleteProductOrderService };
