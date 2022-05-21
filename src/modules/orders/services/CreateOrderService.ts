import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateOrderDTO } from '../dtos/ICreateOrderDTO';
import { IOrder, OrderStatus } from '../models/IOrder';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

@injectable()
class CreateOrderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    user_id,
    status = OrderStatus.OPEN,
  }: ICreateOrderDTO): Promise<IOrder> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new ErrorsApp('User not found', 404);
    }

    const order = await this.ordersRepository.create({ user_id, status });

    return order;
  }
}

export { CreateOrderService };
