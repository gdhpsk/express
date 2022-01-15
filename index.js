const express = require('express')

const app = express()

app.set("view engine", "ejs")

app.use(logger)

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const levelsRouter = require("./routes/levels")
const profileRouter = require("./routes/profile")
app.use('/levels', levelsRouter)
app.use('/profile', profileRouter)

function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
}

app.listen(3000)