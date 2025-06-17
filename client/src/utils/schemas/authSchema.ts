import Joi from "joi";
import { emailPattern, usernamePattern } from "./patterns";

export const signInSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required().messages({
    "string.empty": "Email is required",
    "string.pattern.base": "Invalid email format",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

export const signUpSchema = Joi.object({
  username: Joi.string().pattern(usernamePattern).required().messages({
    "string.empty": "Username is required",
    "string.pattern.base":
      "Username must contain at least one letter and be 2–20 characters long. Symbols and numbers are allowed, but at least one letter is required.",
  }),

  email: Joi.string().pattern(emailPattern).required().messages({
    "string.empty": "Email is required",
    "string.pattern.base": "Invalid email format",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),

  repeatPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Please confirm your password",
  }),

  terms: Joi.boolean().valid(true).required().messages({
    "any.only": "You must accept the terms to proceed",
  }),
}).unknown(true);
