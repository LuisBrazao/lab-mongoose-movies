// bin/seeds.js
const mongoose = require('mongoose');
const Movie = require('../models/Movie.js');
const DB_NAME = 'starter-code';
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const movies = [
  {
    title: 'Top Gun',
    genre: 'Action',
    plot: 'Planes and shit.',
    actor: "5faaba0342ddee134a3686ec"
  },
  {
    title: 'Pulp Fiction',
    genre: 'Weird',
    plot: 'Sam L. Jackson saying motherfucker.',
    actor: "5faaba0342ddee134a3686ed"
  },
  {
    title: 'Titanic',
    genre: 'Romance',
    plot: 'Boat is trash.',
    actor: "5faaba0342ddee134a3686ee"
  }
];


Movie.create(movies)
  .then(moviesFromDB => {
    console.log(`Created ${moviesFromDB.length} movies`);
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating movies from the DB: ${err}`));