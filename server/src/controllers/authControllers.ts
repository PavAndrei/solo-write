import { hash, compare } from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

import { User } from "../models/User";
import { errorHandler } from "../middlewares/errorHandler";
import { hashCode } from "../utils/hashing/hashCode";

import { SignupRequestBody, SigninRequestBody } from "../interfaces/auth";
import { CODE_RESEND_INTERVAL_MS } from "../constants";
import { generateAndSendVerificationCode } from "../utils/generateAndSaveVerificationCode";
import { generateToken } from "../utils/generateToken";
import { generateRandomPassword } from "../utils/generateRandomPassword";

export const signup = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, fileUrl } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? "Email already in use"
            : "Username already taken",
      });
    }

    const hashedPassword = await hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fileUrl,
    });

    const result = await newUser.save();

    const { password: removedPassword, ...userWithoutPassword } =
      result.toObject();

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
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return next(errorHandler(401, "Invalid email or password"));
    }

    const result = await compare(password, existingUser.password);

    if (!result) {
      return next(errorHandler(401, "Invalid email or password"));
    }

    const token = generateToken(
      {
        userId: existingUser._id as string,
        email: existingUser.email,
        verified: existingUser.verified,
        role: existingUser.role,
      },
      { expiresIn: "8h" }
    );

    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .json({ success: true, message: "Log in successfully" });
  } catch (err) {
    next(err);
  }
};

export const signout = (req: Request, res: Response, next: NextFunction) => {
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

export const google = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const { credential } = req.body;

    if (!credential) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return next(errorHandler(400, "Invalid Google token"));
    }

    let existingUser = await User.findOne({ email: payload.email });

    if (!existingUser) {
      existingUser = await User.create({
        email: payload.email,
        verified: true,
        username:
          payload.name?.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        avatarUrl: payload.picture,
        password: generateRandomPassword,
      });
    }

    const token = generateToken(
      {
        userId: existingUser._id as string,
        email: existingUser.email,
        verified: existingUser.verified,
        role: existingUser.role,
      },
      { expiresIn: "8h" }
    );

    if (token) {
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        })
        .status(200)
        .json({ success: true, message: "Logged in with Google" });
    }

    return next(errorHandler(500, "Unexpected error occured"));
  } catch (err) {
    next(err);
  }
};
