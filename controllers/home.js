const { sendEmail, receiveEmail } = require("../utils/send-email");
const { validationResult } = require("express-validator");
const statusCodes = require("../common/status-codes");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const { dirname } = require("path");

exports.getIndex = async (req, res) => {
  res.render("home/index", { pageTitle: "Green Dream London" })
}

exports.postEmail = async (req, res) => {
  try {
    const {subject, email, message} = req.body
    const attachment = req.files
    let files = []
    attachment.forEach(elem => {
      files.push(elem.path)  
    })

    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res
        .status(statusCodes.BadRequest)
        .send(
          `<script>alert('${validationErrors.errors[0].msg}'); window.location.href = "/";</script>`
        )
    }

    await receiveEmail(email, subject, message, attachment),
       sendEmail(email)

    deletePhotos(files, path)

    res.redirect("/")
  }
  catch (err) {
    console.log(err)
    return res.status(statusCodes.InternalServerError).redirect("/")
  }
}

const deletePhotos = async (files) =>{
    files.forEach(elem => {
        const dir = path.join(__dirname, '..', elem)
        fs.unlinkSync(dir)
    });
}