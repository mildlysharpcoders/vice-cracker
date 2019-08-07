const passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(
  new LocalStrategy(function(username, password, done) {
    console.log("Attempting authentication of: ", username, password);
    db.User.findOne({ email: username })
      .then(function(result) {
        if (!result) {
          console.log("Incorrect username");
          return done(null, false, {
            message: "Incorrect username."
          });
        }
        // If we're using an invalid password
        else if (result.password != password) {
          console.log("Incorrect password");
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        let user = { _id: result._id, email: result.email };
        console.log("User authenticated: ", user);
        return done(null, user);
      })
      .catch(function(err) {
        return done(err, false, {
          message: err
        });
      });
  })
);

// In order to help keep authentication state across HTTP requests,
// passport needs methods to serialize and deseralize the user
// this is a simple example, the serialzed user is the username -- which is stored in the session.
passport.serializeUser(function(user, callback) {
  callback(null, user);
});

// the deserialized user is an object with a username property -- which is availabe as request.user
passport.deserializeUser(function(user, callback) {
  callback(null, user);
});

module.exports = passport;
