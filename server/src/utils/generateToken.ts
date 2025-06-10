import jwt from "jsonwebtoken";

interface ITokenPayload {
  userId: string;
  email: string;
  verified: boolean;
  role: "admin" | "user";
}

export const generateToken = (
  payload: ITokenPayload,
  expiresIn: jwt.SignOptions
): string => {
  const secretKey: jwt.Secret | jwt.PrivateKey = process.env.TOKEN_SECRET;
  return jwt.sign(payload, secretKey, expiresIn);
};
