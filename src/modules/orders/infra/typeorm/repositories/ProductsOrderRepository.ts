import { ICreateProductOrderDTO } from '@modules/orders/dtos/ICreateProductOrderDTO';
import { IProductsOrderRepository } from '@modules/orders/repositories/IProductsOrderRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm/';

import { ProductOrder } from '../models/ProductOrder';

class ProductsOrderRepository implements IProductsOrderRepository {
  private ormRepository: Repository<ProductOrder>;

  constructor() {
    this.ormRepository =
      AppDataSource.getRepository<ProductOrder>(ProductOrder);
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateProductOrderDTO): Promise<ProductOrder> {
    const productOrder = this.ormRepository.create(data);

    await this.ormRepository.save(productOrder);

    return productOrder;
  }

  public async save(data: ProductOrder): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<ProductOrder | undefined> {
    const productOrder = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return productOrder;
  }

  public async delete(productOrder: ProductOrder): Promise<void> {
    await this.ormRepository.remove(productOrder);
  }
}

export { ProductsOrderRepository };
