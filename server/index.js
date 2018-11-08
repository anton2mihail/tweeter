"use strict";

// Basic express setup:
require("dotenv").config();
const PORT = process.env.port || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mongo client and driver setup
const MongoClient = require("mongodb").MongoClient;
// URI to connect to the database
const MONGODB_URI = process.env.MONGODB_URI;

let DataHelpers, tweetsRoutes;

// Connect to the database and keep that connect
MongoClient.connect(
  MONGODB_URI,
  (err, db) => {
    if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }
    DataHelpers = require("./lib/data-helpers.js")(db);
    tweetsRoutes = require("./routes/tweets")(DataHelpers);
    app.use("/tweets", tweetsRoutes);
  }
);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
