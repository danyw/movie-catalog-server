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

const error404 = require("./handlers/error/404");
const error500 = require("./handlers/error/500");

app.listen(PORT, () => {
  console.log(`listening listening on ${PORT} :)`);
});
