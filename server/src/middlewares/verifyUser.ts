import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler";

interface IRequestWithToken extends Request {
  user?: string | jwt.JwtPayload;
}

export const verifyUser = (
  req: IRequestWithToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;

    if (!token || typeof token !== "string") {
      return next(errorHandler(403, "No access"));
    }

    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    if (verifiedToken) {
      req.user = verifiedToken;
      return next();
    }

    next(errorHandler(403, "No access"));
  } catch (err) {
    next(err);
  }
};
