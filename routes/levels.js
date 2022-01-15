const express = require("express")
const router = express.Router()
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));

router.get('/', function (req, res) {
    res.send("20,000 levels")
  })
  
  router.get('/daily', function (req, res) {
      res.send("The Daily Level is your mom lol xd")
  })

  router.get('/new', function (req, res) {
    res.render("real.ejs")
})

router.get('/new/:name', function (req, res) {
    res.render("real.ejs", { firstName: req.params.name})
    
})

  router.post("/", (req, res) => {
      console.log(req.body.firstName)
      res.send(`You have just submitted this form with the name of ${req.body.firstName}`)
  })

router.route("/:id")
    .get(async (req, res) => {
            var respond = await fetch(`https://gdbrowser.com/api/level/${req.params.id}`)
            const body = await respond.text()

            if(body == "-1") { 
                res.send(`${req.params.id} is not a valid ID`)
            } else {
                var txt = ""
                for(const key in JSON.parse(body)) {
                    txt += `${key}: ${JSON.parse(body)[key]}<br>`
                }
                res.send(txt)
                console.log(`Data has been sent for Level ID ${req.params.id}`)
            }
    })
    .put((req, res) => {
        res.send(`ID ${req.params.id} Updated`)
    }).delete((req, res) => {
        res.send(`ID ${req.params.id} Deleted`)
    })

router.param("id", (req, res, next, id) => {
    next()
})

  module.exports = router