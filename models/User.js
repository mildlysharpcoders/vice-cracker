let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  sessionid: String,
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  address: String,
  city: String,
  state: String,
  zip: String
});

let User = mongoose.model("User", UserSchema);

module.exports = User;
