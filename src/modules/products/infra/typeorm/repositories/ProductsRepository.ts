import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm/';

import { Products } from '../models/Products';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Products>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Products>(Products);
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateProductDTO): Promise<Products> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  public async getAll(filter: IFilterQuery): Promise<[Products[], number]> {
    const userFilterBuilder = new FilterBuilder(this.ormRepository, 'users');
    const qb = userFilterBuilder.build(filter);
    const result = await qb.getManyAndCount();

    return result;
  }

  public async save(product: Products): Promise<void> {
    await this.ormRepository.save(product);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Products | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return product;
  }

  public async delete(product: Products): Promise<void> {
    await this.ormRepository.remove(product);
  }
}

export { ProductsRepository };
