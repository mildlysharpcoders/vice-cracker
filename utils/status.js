const db = require("../models");
const moment = require("moment");

function storeStatusUpdate(message, user) {
  const timestamp = moment().format("YYYY-MM-DD HH:MM:SS");

  let status = {
    email: user.email,
    timestamp,
    message
  };

  db.Status.create(status)
    .then(result => {
      console.log("Created new status for", result.email);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = { storeStatusUpdate };
