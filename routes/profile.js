const express = require("express")
const router = express.Router()
const database = require("../users.json").users
const username = require("../users.json").usernames

router.get("/", (req, res) => {
    res.json(database)
})

router.get("/submit", (req, res) => {
    res.render("newuser.ejs")
})

router.post("/", (req, res) => { 
    if(username.includes(req.body.name.toLowerCase())) {
        return res.send("Please put a unique name!")
    }
    if(req.body.name == "") {
        return res.send("Please input an actual name!") 
    }
    if(req.body.pro == "") {
        return res.send("Please input a real number!")
    }
    if(parseInt(req.body.pro) < 1) {
        return res.send("Please input a number above 0!")
    }
        database.push({
            name: req.body.name,
            records: parseInt(req.body.pro)
        })
        username.push(req.body.name.toLowerCase())
        res.status(201).send("Database has been updated.")
})

router.delete("/delete/:user", (req, res) => {
   const index = database.findIndex(key => key.name == req.params.user)
   if(index == -1) {
       return res.send("Please input a valid user to delete!")
   }
   database.splice(index,1)
   username.splice(index, 1)
    res.status(201).send(`Successfully deleted ${req.params.user}.`)
})

router.get("/:name/:pro", (req, res) => {
    if(username.includes(req.params.name.toLowerCase())) {
        return res.send("Please put a unique name!")
    }
    if(isNaN(req.params.pro)) {
        return res.send("Please input a valid number!")
    }
    if(parseInt(req.params.pro) < 1) {
        return res.send("Please input a number above 0!")
    }
    username.push(req.params.name.toLowerCase())
    res.status(201).send("Database has been updated.")
})

router.param("name", (req, res, next, name) => {
    if(!username.includes(req.params.name.toLowerCase()) && !isNaN(req.params.pro)) {
        if(parseInt(req.params.pro) > 0) {
    database.push({
        name: name,
        records: parseInt(req.params.pro)
    })
}
}
    next()
})

module.exports = router