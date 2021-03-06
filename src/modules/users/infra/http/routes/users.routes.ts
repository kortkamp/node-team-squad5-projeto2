import { Router } from 'express';

import { UsersController } from '../controllers/UsersController';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  createUserValidate,
  listUserValidate,
  updateUserValidate,
  paramsIdValidate,
} from '../validations/users.validation';

const usersRoutes = Router();

usersRoutes.use(authMiddleware);

const usersController = new UsersController();

usersRoutes.post('/', createUserValidate, usersController.create);

usersRoutes.put('/:id', updateUserValidate, usersController.update);

usersRoutes.delete('/:id', paramsIdValidate, usersController.delete);

usersRoutes.get('/:id', paramsIdValidate, usersController.show);

usersRoutes.get('/', listUserValidate, usersController.index);

export { usersRoutes };
