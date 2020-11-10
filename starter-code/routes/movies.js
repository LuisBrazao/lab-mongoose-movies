const express = require('express');
const Celebrity = require('../models/Celebrity');
const { model } = require('../models/Movie');
const router = express.Router();
const Movie = require("../models/Movie")

router.get("/movies", (req, res) => {
  Movie.find()
    .populate("celebrity")
    .then((movies) => {
      res.render("movies/index", { movies: movies })
    })
})

router.get("/movies/new", (req, res) => {
  Celebrity.find()
  .then((celeb) => {
    res.render("movies/new", { celebs: celeb })
  })
})

router.get("/movies/:id", (req, res) => {
  let movieId = req.params.id;
  Movie.findById(movieId)
    .populate("celebrity")
    .then((movie) => {
      res.render("movies/show", { movie: movie })
    })
})

router.post("/movies", (req, res) => {
  let { title, genre, plot, celebrity } = req.body
  Movie.create({
    title,
    genre,
    plot,
    celebrity
  }).then(() => {
    res.redirect("/movies")
  })
})

router.get("/movies/:movieId/edit", (req, res) => {
  let movieId = req.params.movieId;
  Celebrity.find()
    .then((celebs) => {
      Movie.findById(movieId)
        .populate("celebrity")
        .then(movie => {
          console.log(movie)
          res.render('movies/edit', { movie: movie, celebs: celebs })
        })
        .catch(error => res.render("error", { error }))
    })
})

router.post("/movies/:movieId", (req, res) => {
  let movieId = req.params.movieId;
  let { title, genre, plot, celebrity } = req.body
  Movie.findByIdAndUpdate(movieId, {
    title,
    genre,
    plot,
    celebrity
  })
    .then(() => {
      res.redirect("/movies")
    })
    .catch(error => res.render("error", { error }))
})

router.post("/movies/:movieId/delete", (req, res) => {
  let movieId = req.params.movieId;
  Movie.findByIdAndRemove(movieId)
    .then(() => {
      res.redirect("/movies/")
    })
    .catch(error => res.render("error", { error }))
})

module.exports = router;