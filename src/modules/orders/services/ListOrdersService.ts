import { injectable, inject } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';

import { IOrdersRepository } from '../repositories/IOrdersRepository';

@injectable()
class ListOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(filters: IFilterQuery): Promise<IListResultInterface> {
    const [orders, length] = await this.ordersRepository.getAll(filters);

    const total = await this.ordersRepository.getTotal();

    return {
      result: orders,
      total_registers: total,
      total_filtered: length,
      page: filters.page,
      per_page: filters.per_page,
      total_pages: Math.ceil(length / filters.per_page),
    };
  }
}

export { ListOrdersService };
