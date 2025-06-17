import { Request, Response, NextFunction } from "express";

export const appendFileUrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file && req.file.path) {
    req.body.fileUrl = req.file.path;
  }
  next();
};
