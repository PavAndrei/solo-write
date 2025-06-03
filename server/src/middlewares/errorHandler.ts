import type { AppError } from "../types/AppError";

export const errorHandler = (statusCode: number, message: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  return error;
};
