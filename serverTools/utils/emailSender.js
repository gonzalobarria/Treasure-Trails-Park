const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.sendEmail = async (options) => {
  options.fromName = 'Plásticos Valerné';
  options.fromEmail = process.env.SMTP_USER;

  const message = {
    from: `${options.fromName} <${options.fromEmail}>`,
    to: `${options.userEmail}`,
    subject: `${options.subject}`,
    text: `${options.message}`,
  };

  return await transporter.sendMail(message);
};
