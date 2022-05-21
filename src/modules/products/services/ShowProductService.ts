import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IProduct } from '../models/IProduct';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute(productId: string): Promise<IProduct> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new ErrorsApp('Product not found', 404);
    }

    return product;
  }
}

export { ShowProductService };
