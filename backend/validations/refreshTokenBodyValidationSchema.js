import Joi from "joi";

const refreshTokenBodyValidation = (body) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required().label("Refresh token")
  });
  return schema.validateAsync(body);
};

export default refreshTokenBodyValidation;
