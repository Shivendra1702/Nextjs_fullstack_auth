import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3e32871718f498",
        pass: "370cf86f436719",
      },
    });

    const mailOptions = {
      from: "shivendrapratapjadia@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email" : "Reset your passwword",
      html: `
           <p>Click <a href="${
             process.env.DOMAIN
           }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify Your Email" : "Reset Your Password"
      }</p>
        `,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
