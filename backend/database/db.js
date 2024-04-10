require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");

const url = process.env.MONGO;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db;
