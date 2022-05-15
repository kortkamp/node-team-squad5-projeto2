import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IProduct } from '../models/IProduct';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<IProduct>;
  getAll(filter: IFilterQuery): Promise<[IProduct[], number]>;
  findById(
    productId: string,
    relations?: string[],
  ): Promise<IProduct | undefined>;
  findByCode(code: string): Promise<IProduct>;
  save(dataUpdate: IProduct): Promise<void>;
  delete(product: IProduct): Promise<void>;
  getTotal(): Promise<number>;
}

export { IProductsRepository };
