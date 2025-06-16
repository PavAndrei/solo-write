import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[^@]+@[^@]+\.[^@]+$/)
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.pattern.base": "Invalid email format",
    }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});
