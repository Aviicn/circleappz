import * as Joi from "joi";

export const registerSchema = Joi.object().keys({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3).max(100),
});

export const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
