const express = require("express")
const router = express.Router()
const data = require("../user.json").Set1

router.get("/", (req, res) => {
    var obj = {firstQuestion: data.Questions[0].Question, QuestionAmount: data.Questions.length}
    res.render("answers.ejs", obj)
})

router.put("/:Question/:Answer", (req, res) => {
    res.json(req.params)
    data.Questions.push(req.params)
})

router.delete("/:index", (req, res) => {
    if(isNaN(req.params.index)) {
        res.send("Please input a valid index!")
        return
    }
    if(!data.Questions[req.params.index]) {
        res.send("Please input an actual index!")
        return
    }
    data.Questions.splice(parseInt(req.params.index), 1)
    res.json(data.Questions)
})

router.post("/maximum/:id", (req, res) => {
    if(isNaN(req.params.id)) {
        res.send("Please send a valid number!")
        return
    }
    data.maximumTime = parseInt(req.params.id)
    res.json(data.maximumTime)
})

router.post("/realdata", (req, res) => {
    res.json(data) 
})

module.exports = router