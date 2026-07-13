import nodemailer from "nodemailer";
import { env } from "../config/env.js";



export const transporter =
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    family: 4,

    auth: {
      user: env.emailUser,
      pass: env.emailPass,
    },
  });



export const sendOtpEmail = async (
  email,
  otp
) => {

  console.log("VERIFYING TRANSPORTER");
console.log(env.emailUser, env.emailPass);
  

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