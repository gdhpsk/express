const mongoose = require("mongoose")

var clicks = new mongoose.Schema({
    clicks: Number
})

module.exports = mongoose.model("clicks", clicks)