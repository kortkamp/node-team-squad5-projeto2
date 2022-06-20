import { ordersRoutes } from '@modules/orders/infra/http/routes/orders.routes';
import { productsOrderRoutes } from '@modules/orders/infra/http/routes/productsOrder.routes';
import { productsRoutes } from '@modules/products/infra/http/routes/products.routes';
import { sessionsRoutes } from '@modules/users/infra/http/routes/sessions.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerJsonDocs from './swagger.json';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/product-order', productsOrderRoutes);

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsonDocs));

export { routes };
