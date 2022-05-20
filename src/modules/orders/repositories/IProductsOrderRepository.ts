import { ICreateProductOrderDTO } from '../dtos/ICreateProductOrderDTO';
import { IProductOrder } from '../models/IProductOrder';

interface IProductsOrderRepository {
  create(data: ICreateProductOrderDTO): Promise<IProductOrder>;
  findById(
    id: string,
    relations?: string[],
  ): Promise<IProductOrder | undefined>;
  delete(productOrder: IProductOrder): Promise<void>;
  getTotal(): Promise<number>;
}

export { IProductsOrderRepository };
