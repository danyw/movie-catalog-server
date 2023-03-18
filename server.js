"use strict";
//imports
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

//handler imports
const notFound = require("./handlers/error/404");
const serverErr = require("./handlers/error/500");
const {
  homeHandler,
  movieListHandler,
  movieAddHandler,
  movieDeleteHandler,
} = require("./handlers/database/movieHandlers");

app.get("/", homeHandler);
app.get("/movielist", movieListHandler);
app.post("/movielist/add", movieAddHandler);
// app.put("/movielist/:id", movieUpdateHandler);
app.delete("/movielist/delete/:id", movieDeleteHandler);
app.get("*", notFound);

//release date cast plot summary director

mongoose.connect("mongodb://127.0.0.1:27017/movielist");

app.use(serverErr);

app.listen(PORT, () => {
  console.log(`listening listening on ${PORT} :)`);
});
