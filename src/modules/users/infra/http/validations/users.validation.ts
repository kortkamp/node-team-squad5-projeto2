import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createUserValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().trim().lowercase().required(),
      company: Joi.string().required(),
      CNPJ: Joi.string()
        .regex(/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/)
        .required(),
      segment: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  },
  {
    abortEarly: false,
  },
);

export const updateUserValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(100),
    email: Joi.string().email().trim().lowercase(),
    company: Joi.string(),
    CNPJ: Joi.string().regex(/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/),
    segment: Joi.string(),
    old_password: Joi.string(),
    password: Joi.string(),
  }).and('password', 'old_password'),
});

export const listUserValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});

export const paramsIdValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});
