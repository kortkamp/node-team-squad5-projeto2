import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createProductValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      description: Joi.string().required(),
      value: Joi.number().positive(),
      code: Joi.string().required(),
      quantity: Joi.number().positive(),
      category: Joi.string().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const listProductValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});

export const paramsIdValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});
