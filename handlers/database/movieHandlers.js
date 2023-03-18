"use strict";
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/movielist");

//SCHEMA
const movieSchema = new mongoose.Schema({
  title: String,
  plot: String,
  posterUrl: String,
  released: Date,
  cast: [String],
  users: [String],
});

//MODEL
const movieModel = mongoose.model("movie", movieSchema);

//HOME
function homeHandler(req, res) {
  res.send("homepage");
}

//GET
//find by user and return that?
async function movieListHandler(req, res) {
  let movieList = await movieModel.find({});
  res.json(movieList);
}

//GET
//find by user and return that?
async function movieFavouritesHandler(req, res) {
  const { user } = req.query;
  if (!user) {
    return res.status(400).json({ message: "no movies found" });
  }

  const movieList = await movieModel.find({ users: user });
  res.json(movieList);
}

// ADD
// async function movieAddHandler(req, res) {
//   console.log(req.body);

//   const title = req.body.title;
//   const plot = req.body.plot;
//   const posterUrl = req.body.posterUrl;
//   const released = req.body.released;
//   const cast = req.body.cast;

//   let newMovie = await movieModel.create({
//     title,
//     plot,
//     posterUrl,
//     released,
//     cast,
//   });
//   newMovie.save();
//   res.json(newMovie);
// }

async function movieAddHandler(req, res) {
  try {
    const { title, plot, posterUrl, released, cast, user } = req.body;

    let movie = await movieModel.findOne({ title });
    if (!movie) {
      movie = new movieModel({
        title,
        plot,
        posterUrl,
        released,
        cast,
        users: [user],
      });
      await movie.save();
    } else if (!movie.users.includes(user)) {
      movie.users.push(user);
      await movie.save();
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error adding user to movie: ${error}`);
    return res.status(500).json({ error: "Server error" });
  }
}

//DELETE
// async function movieDeleteHandler(req, res) {
//   try {
//     const id = req.params.id;
//     if (!id) {
//       throw new Error("Invalid request parameter: id is missing");
//     }
//     await movieModel.findByIdAndDelete(id);
//     let allMovies = await movieModel.find({});
//     res.send(allMovies);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// }

async function movieDeleteHandler(req, res) {
  try {
    const { id, user } = req.params;
    const movie = await movieModel.findById(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    if (movie.users.length === 1 && movie.users[0] === user) {
      await movieModel.findByIdAndDelete(id);
    } else {
      movie.users = movie.users.filter((u) => u !== user);
      await movie.save(); // <-- assign the filtered array back to movie.users
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error deleting user from movie: ${error}`);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  homeHandler,
  movieListHandler,
  movieAddHandler,
  movieFavouritesHandler,
  movieDeleteHandler,
};
