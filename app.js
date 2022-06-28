const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorController = require('./controllers/error')

const app = express()

require('dotenv').config()

app.set('view engine', 'ejs');
app.set('views', 'views')

const homeRoutes = require('./routes/home')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())

app.use(homeRoutes)


app.use(errorController.get404)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
