const express = require('express')
const {body} = require('express-validator')
const messages = require('../common/messages')
const path = require('path')

const homeController = require('../controllers/home')

const router = express.Router()

router.get('/', homeController.getIndex)

router.post('/',
    body('email').isEmail().withMessage(messages.InvalidEmailAddress),
    body('subject').not().isEmpty().withMessage(messages.InvalidEmailSubject),
    body('message').not().isEmpty().withMessage(messages.InvalidEmailMessage),
    homeController.postEmail)

module.exports = router