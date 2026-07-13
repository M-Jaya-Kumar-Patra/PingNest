import nodemailer from "nodemailer";
import { env } from "../config/env.js";


export const transporter =
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });


export const sendOtpEmail = async (
  email,
  otp
) => {

  console.log("VERIFYING TRANSPORTER");

  console.log(
  "EMAIL USER:",
  process.env.EMAIL_USER
);

console.log(
  "EMAIL PASS EXISTS:",
  !!process.env.EMAIL_PASS
);

console.log(
  "EMAIL USER1:",
  env.EMAIL_USER
);

console.log(
  "EMAIL PASS EXISTS1:",
  !!env.EMAIL_PASS
);

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