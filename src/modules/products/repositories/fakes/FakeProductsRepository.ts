import { FakeProduct } from '@modules/products/models/fakes/FakeProduct';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateProductDTO } from '../../dtos/ICreateProductDTO';
import { IProduct } from '../../models/IProduct';
import { IProductsRepository } from '../IProductsRepository';

class FakeProductsRepository implements IProductsRepository {
  private products: IProduct[] = [];

  async create(data: ICreateProductDTO): Promise<IProduct> {
    try {
      const product = new FakeProduct();
      this.products.push(product);
      return product;
    } catch (e: any) {
      throw new ErrorsApp(e.message);
    }
  }
  getAll(filter: IFilterQuery): Promise<[IProduct[], number]> {
    throw new ErrorsApp('Method not implemented.');
  }
  findById(productId: string, relations?: string[]): Promise<IProduct> {
    throw new ErrorsApp('Method not implemented.');
  }
  findByCode(code: string): Promise<IProduct> {
    throw new ErrorsApp('Method not implemented.');
  }
  save(dataUpdate: IProduct): Promise<void> {
    throw new ErrorsApp('Method not implemented.');
  }
  delete(product: IProduct): Promise<void> {
    throw new ErrorsApp('Method not implemented.');
  }
  getTotal(): Promise<number> {
    throw new ErrorsApp('Method not implemented.');
  }
}

export { FakeProductsRepository };
