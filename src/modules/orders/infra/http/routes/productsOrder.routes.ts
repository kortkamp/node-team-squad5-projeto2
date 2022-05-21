import { authMiddleware } from '@modules/users/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { ProductsOrderController } from '../controllers/ProductsOrderController';

const productsOrderRoutes = Router();

productsOrderRoutes.use(authMiddleware);

const productsOrderController = new ProductsOrderController();

productsOrderRoutes.post('/', productsOrderController.create);

productsOrderRoutes.delete('/:id', productsOrderController.delete);

// ordersRoutes.get('/:id', ordersController.show);

export { productsOrderRoutes };
