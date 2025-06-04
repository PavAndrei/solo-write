import { AppError } from "../types/AppError";

export const errorHandler = (
  errOrStatus: unknown,
  message?: string
): AppError => {
  const error = new Error() as AppError;

  if (typeof errOrStatus === "number" && message) {
    error.statusCode = errOrStatus;
    error.message = message;
  } else if (errOrStatus instanceof Error) {
    error.message = errOrStatus.message;
    error.statusCode = (errOrStatus as any).statusCode || 500;
  } else {
    error.message = "Unknown server error";
    error.statusCode = 500;
  }

  return error;
};
