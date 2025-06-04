import { Router } from "express";

import { signup, signin, signout } from "../controllers/authControllers";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/signout", signout);
