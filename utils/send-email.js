const nodemailer = require('nodemailer');
const constants = require('../common/email-constants');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (email) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: constants.subject,
      html: constants.html
    };
    return await transporter.sendMail(mailOptions);
  } catch (err) {
    logger.error('send' + err.toString());
  }
};

const receiveEmail = async (subject, text, attachments) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject,
      text,
      attachments: attachments.map(attachment => ({
        filename: attachment.filename,
        path: attachment.path
      }))
    };
    return await transporter.sendMail(mailOptions);
  } catch (err) {
    logger.error(err.toString());
  }
};

module.exports = {
  sendEmail,
  receiveEmail
};