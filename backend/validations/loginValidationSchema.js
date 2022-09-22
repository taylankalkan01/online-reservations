import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().required().email().min(5).max(255),
  password: Joi.string().required().min(5).max(255)
});

export default loginSchema;