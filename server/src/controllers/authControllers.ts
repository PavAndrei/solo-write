import { hash, compare } from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User";
import { errorHandler } from "../middlewares/errorHandler";
import {
  signinSchema,
  signupSchema,
} from "../utils/validations/authValidation";

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

  if (!username || !email || !password) {
    return next(errorHandler(400, "Bad request"));
  }

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
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(errorHandler(400, "Bad request"));
    }

    const { error } = signinSchema.validate({ email, password });
    if (error) {
      return next(errorHandler(401, error.details[0].message));
    }

    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return next(errorHandler(401, "Invalid email or password"));
    }

    const result = await compare(password, existingUser.password);

    if (!result) {
      return next(errorHandler(401, "Invalid email or password"));
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        verified: existingUser.verified,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json(token);
  } catch (err) {
    next(err);
  }
};
