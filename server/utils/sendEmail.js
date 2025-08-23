// server/utils/sendEmail.js
const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
  if (!to) throw new Error("No recipient provided for email");
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
};

module.exports = sendEmail;
  