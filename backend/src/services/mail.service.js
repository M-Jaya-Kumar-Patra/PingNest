import { Resend } from "resend";
import { env } from "../config/env.js";

const resend = new Resend(env.resendApiKey);

export const sendOtpEmail = async (email, otp) => {
  const { data, error } = await resend.emails.send({
    from: env.emailFrom,
    to: email,
    subject: "PingNest Verification OTP",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2>PingNest Verification</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing: 6px;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};