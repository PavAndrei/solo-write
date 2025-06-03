import { hash } from "bcryptjs";
import { Request, Response, NextFunction } from "express";

import { User } from "../models/User";
import { errorHandler } from "../middlewares/errorHandler";
import { signupSchema } from "../utils/validations/authValidation";

interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password }: SignupRequestBody = req.body;

  try {
    const { error } = signupSchema.validate({ username, email, password });

    if (error) {
      return next(errorHandler(401, error.details[0].message));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(errorHandler(409, "User already exists"));
    }

    const hashedPassword = await hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const result = await newUser.save();

    const { password: string, ...userWithoutPassword } = result.toObject();

    res.status(201).json({
      success: true,
      message: "Your account has been created successfully",
      userWithoutPassword,
    });
  } catch (err) {
    next(
      errorHandler(
        500,
        err instanceof Error ? err.message : "Unknown server error"
      )
    );
  }
};
