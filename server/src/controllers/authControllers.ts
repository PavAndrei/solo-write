import { hash } from "bcryptjs";
import { Request, Response } from "express";

import { User } from "../models/User";
import { signupSchema } from "../utils/validations/authValidation";

interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export const signup = async (req: Request, res: Response) => {
  const { username, email, password }: SignupRequestBody = req.body;

  try {
    const { error } = signupSchema.validate({ username, email, password });

    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
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
    console.error(err);
    res.status(500).json({ message: "error", err });
  }
};
