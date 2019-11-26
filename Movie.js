const mongoose = require('mongoose');
const db ='mongodb+srv://joshuachin1122:joshua123@cluster0-fdcso.mongodb.net/Movie?retryWrites=true&w=majority';
//const db = 'mongodb+srv://dbJoshua:Happy5267@clusterserver-7zfbt.mongodb.net/Film?retryWrites=true&w=majority';
//const db = 'mongodb://paul:abc123@ds221242.mlab.com:21242/movies';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  title: { type: String },
  year: { type: String },
  genre: { type: String },
  actors: { type: String },
  plot: { type: String },
  poster: { type: String }
});

const Movie = mongoose.model('MovieDb', schema, 'movieCollection');
// const Movie = mongoose.model('Movie', schema, 'movieCollection');

module.exports = Movie;
