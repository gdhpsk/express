const express = require("express")
const router = express.Router()
const got = import("got")
router.use(express.urlencoded({ extended: true }))
const buttonclicks = require("../write.json")
const fs = require("fs")

router.get("/", (req, res) => {
    res.render("button.ejs", {clicks: buttonclicks.numbers})
})
router.get("/json", (req, res) => {
    res.json(buttonclicks)
        const data = JSON.stringify({"numbers": buttonclicks.numbers+1});
fs.writeFile('write.json', data, (err) => {
    if (err) {
        throw err; 
    }
     console.log("JSON data is saved."); 

    })
})
module.exports = router