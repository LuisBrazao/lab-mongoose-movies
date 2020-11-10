const express = require('express');
const { model } = require('../models/Celebrity');
const router = express.Router();
const Celebrity = require("../models/Celebrity")

router.get("/celebrities", (req, res) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render("celebrities/index", {celebrities: celebrities})
    })
})

router.get("/celebrities/new", (req, res) => {
    res.render("celebrities/new")
})

router.get("/celebrities/:id", (req, res) => {
    let celebId = req.params.id;
    Celebrity.findById(celebId)
    .then((celeb) => {
        res.render("celebrities/show", {celeb: celeb})
    })
})

router.post("/celebrities", (req, res) => {
    let { name, occupation, catchPhrase } = req.body
    Celebrity.create({
      name, 
      occupation,
      catchPhrase
    }).then(() => {
      res.redirect("/celebrities")
    })
})

router.get("/celebrities/:celebId/edit", (req, res) => {
    let celebId = req.params.celebId;
  Celebrity.findById(celebId)
        .then(celeb => res.render('celebrities/edit', { celeb: celeb }))
        .catch(error => res.render("error", { error }))
  })

router.post("/celebrities/:celebId", (req, res) => {
    let celebId = req.params.celebId;
    let { name, occupation, catchPhrase } = req.body
    Celebrity.findByIdAndUpdate(celebId, {
      name,
      occupation,
      catchPhrase
    })
      .then(() => {
        res.redirect("/celebrities")
      })
      .catch(error => res.render("error", { error }))
})

router.post("/celebrities/:celebId/delete", (req, res) => {
    let celebId = req.params.celebId;
    Celebrity.findByIdAndRemove(celebId)
      .then(() => {
        res.redirect("/celebrities/")
      })
      .catch(error => res.render("error", { error }))
  })

module.exports = router;