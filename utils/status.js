const db = require("../models");
const moment = require("moment");

function storeStatusUpdate(message, hrefName, href, user) {
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

  let status = {
    email: user.email,
    timestamp,
    message,
    hrefName,
    href
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
