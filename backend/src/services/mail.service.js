import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export const transporter =
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
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