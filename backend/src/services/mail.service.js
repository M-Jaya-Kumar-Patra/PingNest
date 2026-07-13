import nodemailer from "nodemailer";
import { env } from "../config/env.js";


export const transporter =
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
      user: env.emailUser,
      pass: env.emailPass,
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

  

  await transporter.verify();

  console.log("TRANSPORT VERIFIED");

  const info =
    await transporter.sendMail({
      from: env.emailUser,
      to: email,
      subject: "PingNest Verification OTP",
      html: `<h1>${otp}</h1>`,
    });

  console.log(
    "MAIL SENT",
    info.messageId
  );
};