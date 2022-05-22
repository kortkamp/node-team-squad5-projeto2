import '@shared/container/providers';

import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { ProductsOrderRepository } from '@modules/orders/infra/typeorm/repositories/ProductsOrderRepository';
import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';
import { IProductsOrderRepository } from '@modules/orders/repositories/IProductsOrderRepository';
import { EntriesRepository } from '@modules/products/infra/typeorm/repositories/EntriesRepository';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IEntriesRepository } from '@modules/products/repositories/IEntriesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IProductsOrderRepository>(
  'ProductsOrderRepository',
  ProductsOrderRepository,
);

container.registerSingleton<IEntriesRepository>(
  'EntriesRepository',
  EntriesRepository,
);
