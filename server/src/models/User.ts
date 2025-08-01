import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  verified: boolean;
  verificationCode: string | null;
  verificationCodeExpiresAt: Date | null;
  verificationCodeValidation: Date | null;
  forgotPasswordCode: string | null;
  forgotPasswordCodeValidation: Date | null;
  role: "user" | "admin";
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: null,
      select: false,
    },
    verificationCodeExpiresAt: { type: Date, default: null, select: false },
    verificationCodeValidation: {
      type: Date,
      default: null,
      select: false,
    },
    forgotPasswordCode: {
      type: String,
      default: null,
      select: false,
    },
    forgotPasswordCodeValidation: {
      type: Date,
      default: null,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
