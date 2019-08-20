let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let StatusSchema = new Schema({
  email: String,
  timestamp: String,
  message: String,
  hrefName: String,
  href: String
});

let Status = mongoose.model("Status", StatusSchema);

module.exports = Status;
