import { hash, compare } from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User";
import { errorHandler } from "../middlewares/errorHandler";
import {
  signinSchema,
  signupSchema,
  emailVerificationSchema,
  acceptCodeSchema,
} from "../utils/validations/authValidation";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";
import { hashCode } from "../utils/hashing/hashCode";

import { SignupRequestBody, SigninRequestBody } from "../interfaces/auth";
import { CODE_EXPIRATION_TIME_MS, CODE_RESEND_INTERVAL_MS } from "../constants";
import { getRandomCodeValue } from "../utils/getRandomCodeValue";
import { generateAndSendVerificationCode } from "../utils/generateAndSaveVerificationCode";

export const signup = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

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
  req: Request<{}, {}, SigninRequestBody>,
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
        role: existingUser.role,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "8h" }
    );

    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ success: true, message: "Log in successfully" });
  } catch (err) {
    next(err);
  }
};

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ success: true, message: "User has been signed out" });
  } catch (err) {
    next(err);
  }
};

export const sendCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const { error } = emailVerificationSchema.validate({ email });

  if (error) {
    return next(errorHandler(400, error.details[0].message));
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(
        errorHandler(
          404,
          "If your email is registered, a verification code will be sent."
        )
      );
    }

    if (existingUser.verified) {
      return next(
        errorHandler(409, "Your email is already verified. Please log in.")
      );
    }

    if (
      existingUser.verificationCodeValidation &&
      Date.now() - +existingUser.verificationCodeValidation <
        CODE_RESEND_INTERVAL_MS
    ) {
      return next(
        errorHandler(429, "Please wait before requesting a new code.")
      );
    }

    await generateAndSendVerificationCode(existingUser);

    res.status(200).json({
      success: true,
      message: "Verification code sent to your email.",
    });
  } catch (err) {
    next(err);
  }
};

export const verifyCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, providedCode } = req.body;

  const { error } = acceptCodeSchema.validate({ email, providedCode });
  if (error) {
    return next(errorHandler(400, error.details[0].message));
  }

  try {
    const user = await User.findOne({ email }).select(
      "+verificationCode +verificationCodeValidation +verificationCodeExpiresAt"
    );

    if (!user) {
      return next(
        errorHandler(
          404,
          "If your email is registered, a verification code will be sent."
        )
      );
    }

    if (user.verified) {
      return next(
        errorHandler(409, "Your email is already verified. Please log in.")
      );
    }

    const { verificationCode, verificationCodeExpiresAt } = user;

    if (!verificationCode || !verificationCodeExpiresAt) {
      return next(
        errorHandler(
          400,
          "Verification code not found. Please request a new one."
        )
      );
    }

    if (new Date() > verificationCodeExpiresAt) {
      return next(
        errorHandler(
          410,
          "Verification code has expired. Please request a new one."
        )
      );
    }

    const hashedProvidedCode = hashCode(providedCode.toString());

    if (hashedProvidedCode !== verificationCode) {
      return next(errorHandler(400, "Invalid verification code."));
    }

    user.verified = true;
    user.verificationCode = null;
    user.verificationCodeValidation = null;
    user.verificationCodeExpiresAt = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Your account has been verified!",
    });
  } catch (err) {
    next(err);
  }
};
