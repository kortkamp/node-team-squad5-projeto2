import { injectable, inject } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';

import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(filters: IFilterQuery): Promise<IListResultInterface> {
    const [products, length] = await this.productsRepository.getAll(filters);

    const total = await this.productsRepository.getTotal();

    return {
      result: products,
      total_registers: total,
      total_filtered: length,
      page: filters.page,
      per_page: filters.per_page,
      total_pages: Math.ceil(length / filters.per_page),
    };
  }
}

export { ListProductsService };
