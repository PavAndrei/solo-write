import { IUser } from "../models/User";
import { getRandomCodeValue } from "./getRandomCodeValue";
import { sendVerificationEmail } from "./sendVerificationEmail";
import { hashCode } from "./hashing/hashCode";
import { CODE_EXPIRATION_TIME_MS } from "../constants";
import { errorHandler } from "../middlewares/errorHandler";

export const generateAndSendVerificationCode = async (user: IUser) => {
  const codeValue = getRandomCodeValue();
  const info = await sendVerificationEmail(user.email, codeValue);

  if (!info.accepted.includes(user.email)) {
    throw errorHandler(400, "Failed to send verification code.");
  }

  user.verificationCode = hashCode(codeValue);
  user.verificationCodeValidation = new Date();
  user.verificationCodeExpiresAt = new Date(
    Date.now() + CODE_EXPIRATION_TIME_MS
  );

  await user.save();
};
