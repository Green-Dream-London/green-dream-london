const nodemailer = require('nodemailer')
const MailMessage = require('nodemailer/lib/mailer/mail-message')
const constants = require('../common/email-constants')
const logger = require('../utils/logger')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const sendEmail = async (email) => {
    try {
        return await sgMail.send({
            from: process.env.EMAIL_USER,
            to: email,
            subject: constants.subject,
            html: constants.html
        })
    }   
    catch (err) {
        logger.error(err.toString())
    }
}

const receiveEmail = async (subject, text, attachments) => {
    try {
        return await sgMail.send({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject,
            text,
            attachments
        }) 
    }   
    catch (err) {
        logger.error(err.toString())
    }
}

module.exports = {
    sendEmail,
    receiveEmail
}
