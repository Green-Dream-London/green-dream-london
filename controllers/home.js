const { sendEmail, receiveEmail } = require("../utils/send-email");
const { validationResult } = require("express-validator");
const statusCodes = require("../common/status-codes");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const { dirname } = require("path");
const logger = require("../utils/logger");

exports.getIndex = async (req, res) => {
  try {
    res.render("home/index", { pageTitle: "Green Dream London" })
  }
  catch (err) {
    logger.error(err)
    return res.status(statusCodes.InternalServerError).redirect("/")
  }
}

exports.postEmail = async (req, res) => {
  try {
    const {subject, email} = req.body
    let message = req.body.message
    const attachments = req.files
   
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res
        .status(statusCodes.BadRequest)
        .send(
          `<script>alert('${validationErrors.errors[0].msg}'); window.location.href = "/";</script>`
        )
    }

    let files = []

    attachments.forEach(elem => {
      files.push(elem.path)
      elem.content = fs.readFileSync(elem.path).toString("base64")
    })

    message += `\nMessage was send by ${email}`
    await receiveEmail(subject, message, attachments)
    await sendEmail(email)

    deletePhotos(files)

    res.redirect("/")
  }
  catch (err) {
    logger.error(err)
    return res.status(statusCodes.InternalServerError).redirect("/")
  }
}

const deletePhotos = async (files) =>{
    files.forEach(elem => {
        const dir = path.join(__dirname, '..', elem)
        fs.unlinkSync(dir)
    });
}
