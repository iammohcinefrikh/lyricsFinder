// import the nodemailer module
import nodemailer from "nodemailer";

// function to send a password reset email
export const sendPasswordResetEmail = async (userEmail: string, code: number) => {
  // create a transporter object using smtp transport
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
  });

  // define the mail options
  const mailOptions = {
    from: `"lyricsFinder App" <${process.env.EMAIL_ADDRESS}>`,
    to: userEmail,
    subject: "Password Reset Code",
    text: `Your password reset code is ${code}. It will expire in 5 minutes.`,
    html: `<p>Your password reset code is <strong>${code}</strong>. It will expire in 5 minutes.</p>`,
  };

  // send the email
  await transporter.sendMail(mailOptions);
};