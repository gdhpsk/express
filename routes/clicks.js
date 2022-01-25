const express = require("express")
const router = express.Router()
const got = import("got")
router.use(express.urlencoded({ extended: true }))
const fs = require("fs")
const mongoose = require("mongoose")
const db = mongoose.model("clicks")

router.get("/", async (req, res) => {
    var buttonclicks = await db.findById("61ef1f0c789f36709356fd92")
    res.render("button.ejs", {clicks: buttonclicks.clicks})
})
router.post("/json", async (req, res) => { 
    var buttonclicks = await db.findById("61ef1f0c789f36709356fd92")
    res.json(buttonclicks)
    buttonclicks.clicks = buttonclicks.clicks+1
    buttonclicks.save()
})
module.exports = router