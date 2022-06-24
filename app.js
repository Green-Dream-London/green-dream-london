const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express()

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
