"use strict";

const error500 = (error, req, res, next) => {
  res.status(500).send({
    code: 500,
    route: req.path,
    message: `Server Error: ${error}`,
  });
};

module.exports = error500;
