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

    qb.leftJoin('order.products', 'products');
    qb.addSelect(['products.id', 'products.quantity']);
    qb.leftJoin('products.product', 'product');
    qb.addSelect(['product.name', 'product.value']);

    const result = await qb.getManyAndCount();

    return result;
  }

  public async show(order_id: string): Promise<Order> {
    const queryBuilder = this.ormRepository.createQueryBuilder('order');

    const order = queryBuilder
      .where('order.id = :order_id', { order_id })
      .leftJoin('order.user', 'user')
      .addSelect(['user.name', 'user.id'])
      .leftJoin('order.products', 'products')
      .addSelect(['products.id', 'products.quantity'])
      .leftJoin('products.product', 'product')
      .addSelect(['product.name', 'product.value'])
      .getOne();

    return order;
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
