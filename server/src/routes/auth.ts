import { Router } from "express";

import {
  signup,
  signin,
  signout,
  sendCode,
  verifyCode,
  google,
} from "../controllers/authControllers";
import { verifyUser } from "../middlewares/verifyUser";
import { validateBody } from "../middlewares/validateBody";
import {
  signinSchema,
  signupSchema,
  emailVerificationSchema,
  acceptCodeSchema,
} from "../utils/validations/authValidation";

export const authRouter = Router();

authRouter.post("/signup", validateBody(signupSchema), signup);
authRouter.post("/signin", validateBody(signinSchema), signin);
authRouter.post("/signout", verifyUser, signout);

authRouter.patch(
  "/send-code",
  validateBody(emailVerificationSchema),
  verifyUser,
  sendCode
);
authRouter.patch(
  "/verify-code",
  validateBody(acceptCodeSchema),
  verifyUser,
  verifyCode
);

authRouter.post("/google", google);
