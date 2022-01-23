const express = require("express")
const router = express.Router()
const data = require("../user.json")

router.get("/", (req, res) => {
    var obj = {firstQuestion: data.Questions[0].Question, QuestionAmount: data.Questions.length}
    res.render("answers.ejs", obj)
})

router.post("/", (req, res) => {
    res.send(`Your answer: ${req.body.lol}`)
})

router.post("/realdata", (req, res) => {
    res.json(data)
})

module.exports = router