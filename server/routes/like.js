"use strict";

const userHelper = require("../lib/util/user-helper");

const express = require("express");
const likeRoute = express.Router();

// routes at the like endpoint
module.exports = function(DataHelpers) {
  likeRoute.post("/", (req, res) => {
    DataHelpers.likeTweet(req.body.handle, (err, response) => {
      if (err) throw err;
      if (res) {
        res.status(200);
      } else {
        res.status(501);
      }
    });
  });
  return likeRoute;
};
