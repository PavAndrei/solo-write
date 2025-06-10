import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { errorHandler } from "./errorHandler";

export const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((d) => d.message).join(", ");
      return next(errorHandler(400, message));
    }

    next();
  };
};
