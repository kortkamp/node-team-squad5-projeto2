import { ICreateOrderDTO } from '@modules/orders/dtos/ICreateOrderDTO';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';
import { Repository } from 'typeorm';
import { FilterBuilder, IFilterQuery } from 'typeorm-dynamic-filters';

import { AppDataSource } from '@shared/infra/typeorm/';

import { Order } from '../models/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Order>(Order);
  }

  public async getTotal(): Promise<number> {
    const total = await this.ormRepository.count();

    return total;
  }

  public async create(data: ICreateOrderDTO): Promise<Order> {
    const newOrder = this.ormRepository.create(data);

    await this.ormRepository.save(newOrder);

    return newOrder;
  }

  public async getAll(filter: IFilterQuery): Promise<[Order[], number]> {
    const OrderFilterBuilder = new FilterBuilder(this.ormRepository, 'order');
    const qb = OrderFilterBuilder.build(filter);

    qb.leftJoinAndSelect('order.products', 'user');
    const result = await qb.getManyAndCount();

    return result;
  }

  public async save(data: Order): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Order | undefined> {
    const Order = await this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return Order;
  }

  public async delete(Order: Order): Promise<void> {
    await this.ormRepository.remove(Order);
  }
}

export { OrdersRepository };
