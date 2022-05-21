import { authMiddleware } from '@modules/users/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { OrdersController } from '../controllers/OrdersController';

const ordersRoutes = Router();

ordersRoutes.use(authMiddleware);

const ordersController = new OrdersController();

ordersRoutes.post('/', ordersController.create);

ordersRoutes.get('/:id', ordersController.show);

ordersRoutes.delete('/:id', ordersController.delete);

ordersRoutes.get('/', ordersController.index);

export { ordersRoutes };
