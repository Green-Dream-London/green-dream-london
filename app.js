const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const logger = require('./utils/logger')
const errorController = require('./controllers/error')

const app = express()

require('dotenv').config()

const Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/img");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
})

const upload = multer({
    storage: Storage
}).any("photos")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(upload); 
app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', 'views')

const homeRoutes = require('./routes/home')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())
app.use(homeRoutes)

app.use(errorController.get404)

app.listen(process.env.PORT, () => {
    logger.info(`Listening on port ${process.env.PORT}`)
})
