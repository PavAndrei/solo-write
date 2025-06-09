import { transport } from "../middlewares/sendEmail";

export const sendVerificationEmail = async (email: string, code: string) => {
  return await transport.sendMail({
    from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
    to: email,
    subject: "Verification code for your Solo Write blog account",
    text: `Your verification code is: ${code}`,
    html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; border-radius: 8px; text-align: center; color: #333;">
       <h2 style="color: #4a90e2;">Email Verification</h2>
       <p style="font-size: 16px;">Hello,</p>
       <p style="font-size: 16px;">This code is for verifying your <strong>Solo Write</strong> account:</p>
      <div style="margin: 30px 0;">
        <span style="display: inline-block; background-color: #e1ecf4; padding: 15px 25px; font-size: 24px; font-weight: bold; color: #2c3e50; border-radius: 6px; letter-spacing: 4px;">
          ${code}
        </span>
      </div>
      <p style="font-size: 16px;">Welcome to our platform. We're glad to have you here!</p>
      <p style="margin-top: 40px; font-size: 12px; color: #888;">If you didn’t request this, you can ignore this email.</p>
    </div>
`,
  });
};
