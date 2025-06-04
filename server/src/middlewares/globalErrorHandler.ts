import { Request, Response, NextFunction } from "express";

import { AppError } from "../interfaces/error";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
  });
};
