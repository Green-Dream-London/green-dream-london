const nodemailer = require('nodemailer')
const MailMessage = require('nodemailer/lib/mailer/mail-message')
const constants = require("../common/email-constants")

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendEmail = async (email) => {
    try {
        return await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: constants.subject,
            html: constants.html
        }) 
    }   
    catch (err) {
        console.log(err.toString())
    }
}

const receiveEmail = async (email, subject, text, attachments) => {
    try {
        return await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject,
            text,
            attachments
        }) 
    }   
    catch (err) {
        console.log(err.toString())
    }
}

module.exports = {
    sendEmail,
    receiveEmail
}
