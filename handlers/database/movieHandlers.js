"use strict";
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/movielist");
// /movie/{movie_id}/credits (for cast n crew)

//SCHEMA

const movieSchema = new mongoose.Schema({
  title: String,
  plot: String,
  posterUrl: String,
  released: String,
  cast: Object,
});

const movieModel = mongoose.model("movie", movieSchema);

function homeHandler(req, res) {
  res.send("homepage");
}

//GET
//find by user and return that?
async function movieListHandler(req, res) {
  let movieList = await movieModel.find({});
  res.json(movieList);
}

//ADD

async function movieAddHandler(req, res) {
  console.log(req.body);

  const title = req.body.title;
  const plot = req.body.plot;
  const posterUrl = req.body.posterUrl;
  const released = req.body.released;
  const cast = req.body.cast;

  let newMovie = await movieModel.create({
    title,
    plot,
    posterUrl,
    released,
    cast,
  });
  newMovie.save();
  res.json(newMovie);
}

//UPDATE

//DELETE
async function movieDeleteHandler(req, res) {
  const id = req.params.id;
  await movieModel.findByIdAndDelete(id);
  let allMovies = await movieModel.find({});
  res.send(allMovies);
}

// async function movieDeleteHandler(req, res) {
//   const result = await movieModel.findByIdAndDelete(req.params.id);

//   res.json(result);
// }

//patch
// async function addToCollectionHandler(req, res) {
//   const { userName, name, desc, movieTitle } = req.body;
//   try {
//     const result = await movieModel.findOneAndUpdate(
//       { movie: movieTitle },
//       { $push: { userFavs: userCollection } },
//       { new: true }
//     );
//     res.status(201).send({ message: "Photo added to collection" });
//   } catch (err) {
//     console.log("Error while updating", err);
//   }

// async function updateProductHandler(req, res) {
//   const { name, brand, price, image_link, description } = req.body;
//   const id = req.params.id;
//   await productModel.findByIdAndUpdate(
//     id,
//     { name, brand, price, imageUrl, description },
//     { new: true, overwrite: true }
//   );
//   let allProducts = await productModel.find({});
//   res.send(allProducts);
// }

module.exports = {
  homeHandler,
  movieListHandler,
  movieAddHandler,
  // movieUpdateHandler,
  movieDeleteHandler,
};
