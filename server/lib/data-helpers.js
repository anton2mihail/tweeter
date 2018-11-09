"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets")
        .insertOne(newTweet)
        .then(val => {
          if (val) callback(null, true);
          else callback(new Error("Not inserted"));
        });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweets")
        .find()
        .toArray((err, tweets) => {
          if (err) callback(err);
          callback(null, tweets.sort(sortNewestFirst));
        });
    },

    likeTweet: function(handle, callback) {
      db.collection("tweets")
        .findOneAndUpdate({ "user.handle": handle }, { $inc: { likes: 1 } })
        .then(result => {});
      callback(null, true);
    }
  };
};
