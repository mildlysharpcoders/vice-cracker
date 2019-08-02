let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let viceSchema = new Schema({
  email: String,
  name: String,
  type: String,
  limit: String,
  cost: String,
  weekly: [],
  monthly: []
});

let Vice = mongoose.model("Vice", viceSchema);

module.exports = Vice;
