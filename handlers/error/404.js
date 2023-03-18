"use strict";

const error404 = (req, res, next) => {
  res.status(404).json({
    code: 404,
    route: req.path,
    message: `Page not found`,
  });
};

module.exports = error404;
