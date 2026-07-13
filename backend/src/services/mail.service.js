import nodemailer from "nodemailer";

export const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


export const sendOtpEmail =
  async (email, otp) => {

    console.log(
      "MAIL STEP 1 - Function called"
    );

    console.log(
      "MAIL STEP 2 - Recipient:",
      email
    );

    console.log(
      "MAIL STEP 3 - EMAIL_USER:",
      process.env.EMAIL_USER
    );

    try {

      const info =
        await transporter.sendMail({
          from:
            process.env.EMAIL_USER,

          to: email,

          subject:
            "PingNest Verification OTP",

          html: `
            <h2>Verify Your Account</h2>

            <p>Your OTP is:</p>

            <h1>${otp}</h1>

            <p>Valid for 10 minutes.</p>
          `,
        });

      console.log(
        "MAIL STEP 4 - Email sent"
      );

      console.log(
        "MAIL STEP 5 - Message ID:",
        info.messageId
      );

      return info;

    } catch (error) {

      console.error(
        "MAIL ERROR:",
        error
      );

      throw error;
    }
  };