import { Router } from "express";

import {
  signup,
  signin,
  signout,
  sendCode,
} from "../controllers/authControllers";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/signout", signout);

authRouter.patch("/send-code", sendCode);
