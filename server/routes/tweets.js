"use strict";

const userHelper = require("../lib/util/user-helper");

const express = require("express");
const tweetsRoutes = express.Router();

// routes at the tweet endpoint
module.exports = function(DataHelpers) {
  // Get
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    // Post
    if (!req.body.text) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }

    const user = req.body.user
      ? req.body.user
      : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text.substring(6)
      },
      created_at: Date.now(),
      likes: 0
    };

    DataHelpers.saveTweet(tweet, err => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // Return only new tweet
        res.json(tweet);
      }
    });
  });

  return tweetsRoutes;
};
