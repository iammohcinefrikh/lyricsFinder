import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (userEmail: string, code: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: '"lyricsFinder App" <apprenant3@talents4starups.com>',
    to: userEmail,
    subject: "Password Reset Code",
    text: `Your password reset code is ${code}. It will expire in 5 minutes.`,
    html: `<p>Your password reset code is <strong>${code}</strong>. It will expire in 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};