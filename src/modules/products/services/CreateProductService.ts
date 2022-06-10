import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IProduct } from '../models/IProduct';
import { IEntriesRepository } from '../repositories/IEntriesRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('EntriesRepository')
    private entriesRepository: IEntriesRepository,
  ) {}

  public async execute(data: ICreateProductDTO): Promise<IProduct> {
    const productExists = await this.productsRepository.findByCode(data.code);

    if (productExists) {
      // verify if the name matches
      if (productExists.name !== data.name) {
        throw new ErrorsApp(
          'The product already exists, but the names do not match',
          409,
        );
      }
      // add to product stock
      productExists.quantity += data.quantity;
      await this.productsRepository.save(productExists);
      productExists.entries.push(
        await this.entriesRepository.create({
          product_id: productExists.id,
          quantity: data.quantity,
        }),
      );

      return productExists;
    }

    const product = await this.productsRepository.create(data);
    product.entries.push(
      await this.entriesRepository.create({
        product_id: product.id,
        quantity: data.quantity,
      }),
    );
    return product;
  }
}

export { CreateProductService };
