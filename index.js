const express = require('express')

const app = express()

const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://gdhpsk:+jju667yyj3it+C@gdhpsk-data.ldfbk.mongodb.net/")

const fs = require("fs")

app.set("view engine", "ejs")

app.use(logger)

app.use(express.static("public"))

app.use("/joker/", express.static("JS"))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

for(const file of fs.readdirSync('./routes/').filter(file => file.endsWith('.js'))) {
  app.use(`/${file.replace(".js", "")}`, require(`./routes/${file}`))
}

function logger(req, res, next) {
  if(req.originalUrl == "/answers/realdata") {
    next()
    return
  }
  console.log(`${req.method} ${req.originalUrl}`)
  next()
}

app.listen(process.env.PORT || 3000)