import { injectable, inject } from 'tsyringe';
import { IFilterQuery } from 'typeorm-dynamic-filters';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';

import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(filters: IFilterQuery): Promise<IListResultInterface> {
    const [users, length] = await this.usersRepository.getAll(filters);

    const total = await this.usersRepository.getTotal();

    return {
      result: users,
      total_registers: total,
      total_filtered: length,
      page: filters.page,
      per_page: filters.per_page,
      total_pages: Math.ceil(length / filters.per_page),
    };
  }
}

export { ListUsersService };
