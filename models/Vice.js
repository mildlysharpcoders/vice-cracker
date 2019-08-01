let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let viceSchema = new Schema({
  email: String,
  name: String,
  type: String,
  cost: String,
  details: []
});

let Vice = mongoose.model("Vice", viceSchema);

module.exports = Vice;
