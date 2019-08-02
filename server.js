require("dotenv").config();
const express = require("express");
var session = require("express-session");
const routes = require("./routes");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require("./controllers/passportController");
const users = require("./controllers/userController");
const reminders = require("./utils/reminders");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(session({ secret: "miw", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/vicecracker";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Creata a default user if not present
users.createDefaultUser();

// Define API routes here
app.use(routes);

reminders();

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
