import { createHmac } from "crypto";

export const hashCode = (code: string): string =>
  createHmac("sha256", process.env.TOKEN_SECRET!).update(code).digest("hex");
