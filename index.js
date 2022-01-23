const express = require('express')

const app = express()

const fs = require("fs")

app.set("view engine", "ejs")

app.use(logger)

app.use(express.static("public"))

app.use("/joker/", express.static("js"))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

for(const file of fs.readdirSync('./routes/').filter(file => file.endsWith('.js'))) {
  app.use(`/${file.replace(".js", "")}`, require(`./routes/${file}`))
}

function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
}

app.listen(process.env.PORT || 3000)