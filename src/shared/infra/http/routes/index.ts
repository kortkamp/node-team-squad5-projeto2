import { productsRoutes } from '@modules/products/infra/http/routes/products.routes';
import { sessionsRoutes } from '@modules/users/infra/http/routes/sessions.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/products', productsRoutes);

export { routes };
