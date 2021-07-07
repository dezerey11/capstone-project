require("dotenv").config();
const mongoose = require("mongoose");
const config = { useUnifiedTopology: true, useNewUrlParser: true };
const { MONGODBURL } = process.env;

////// Create the Connection //////
mongoose.connect(MONGODBURL, config);

////// Database Events //////
mongoose.connection
  .on("open", () => console.log("You are Connected to Mongo"))
  .on("close", () => console.log("Mongo Connection Closed"))
  .on("error", (error) => console.log(error));

module.exports = mongoose;
