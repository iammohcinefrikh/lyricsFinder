// import the nodemailer module
import nodemailer from "nodemailer";

// function to send a password reset email
export const sendNewsletter = async (to: string[]) => {
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
    to,
    subject: "Newsletter",
    text: "This is a newsLetter",
    html: `<h1>This is a newsLetter</h1>`,
  };

  // send the email
  await transporter.sendMail(mailOptions);
};