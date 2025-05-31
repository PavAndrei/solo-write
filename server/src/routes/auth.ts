import { Router } from "express";

import { signup } from "../controllers/authControllers";

export const authRouter = Router();

authRouter.post("/signup", signup);
