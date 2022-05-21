import { IFilterQuery } from 'typeorm-dynamic-filters';

import { ICreateOrderDTO } from '../dtos/ICreateOrderDTO';
import { IOrder } from '../models/IOrder';

interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<IOrder>;
  getAll(filter: IFilterQuery): Promise<[IOrder[], number]>;
  findById(orderId: string, relations?: string[]): Promise<IOrder | undefined>;
  show(order_id: string): Promise<IOrder>;
  save(dataUpdate: IOrder): Promise<void>;
  delete(order: IOrder): Promise<void>;
  getTotal(): Promise<number>;
}

export { IOrdersRepository };
