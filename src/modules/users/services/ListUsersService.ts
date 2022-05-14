import { injectable, inject } from 'tsyringe';

import { IListResultInterface } from '@shared/dtos/IListResultDTO';

import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IListResultInterface> {
    const [users, length] = await this.usersRepository.getAll();

    const total = await this.usersRepository.getTotal();

    return {
      result: users,
      total_registers: total,
      total_filtered: length,
      page: undefined,
      per_page: undefined,
      total_pages: undefined,
    };
  }
}

export { ListUsersService };
