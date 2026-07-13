import nodemailer from "nodemailer";
import { env } from "../config/env";

export const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });


export const sendOtpEmail = async (
  email,
  otp
) => {

  console.log("VERIFYING TRANSPORTER");

  await transporter.verify();

  console.log("TRANSPORT VERIFIED");

  const info =
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: email,
      subject: "PingNest Verification OTP",
      html: `<h1>${otp}</h1>`,
    });

  console.log(
    "MAIL SENT",
    info.messageId
  );
};