import { FakeProduct } from '@modules/products/models/fakes/FakeProduct';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateProductDTO } from '../../dtos/ICreateProductDTO';
import { IProduct } from '../../models/IProduct';
import { IProductsRepository } from '../IProductsRepository';

class FakeProductsRepository implements IProductsRepository {
  private products: IProduct[] = [];

  public async create(data: ICreateProductDTO): Promise<IProduct> {
    const product = new FakeProduct(data);
    this.products.push(product);
    return product;
  }
  public async getAll(filter: IFilterQuery): Promise<[IProduct[], number]> {
    return [this.products, this.products.length];
  }
  public async findById(
    productId: string,
    relations?: string[],
  ): Promise<IProduct> {
    const productDesired = this.products.find(
      product => product.id === productId,
    );
    return productDesired;
  }
  public async findByCode(code: string): Promise<IProduct> {
    const productDesired = this.products.find(product => product.code === code);
    return productDesired;
  }
  public async save(dataUpdate: IProduct): Promise<void> {
    const wantedProduct = this.products.findIndex(
      user => user.id === dataUpdate.id,
    );

    if (wantedProduct >= 0) {
      Object.assign(this.products[wantedProduct], dataUpdate);
    }
  }
  public async delete(discardedProduct: IProduct): Promise<void> {
    this.products = this.products.filter(
      product => product.id !== discardedProduct.id,
    );
  }
  public async getTotal(): Promise<number> {
    return this.products.length;
  }
}

export { FakeProductsRepository };
