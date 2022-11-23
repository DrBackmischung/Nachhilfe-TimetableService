const express = require("express")
const router = express.Router()

router.use(logger)

router.get("/", (req, res) => {
  console.log(req.query.name)
  res.send("Timeslot List")
})

router.get("/new", (req, res) => {
  res.render("timeslots/new")
})

router.post("/", (req, res) => {
  const isValid = false
  if (isValid) {
    timeslots.push({ firstName: req.body.firstName })
    res.redirect(`/timeslots/${timeslots.length - 1}`)
  } else {
    console.log("Error")
    res.render("timeslots/new", { firstName: req.body.firstName })
  }
})

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.timeslots)
    res.send(`Get Timeslot With ID ${req.params.id}`)
  })
  .put((req, res) => {
    res.send(`Update Timeslot With ID ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`Delete Timeslot With ID ${req.params.id}`)
  })

const timeslots = [{ name: "Kyle" }, { name: "Sally" }]
router.param("id", (req, res, next, id) => {
  req.timeslots = timeslots[id]
  next()
})

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

module.exports = router