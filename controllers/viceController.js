const db = require("../models");
const moment = require("moment");

const viceController = {
  getVicesForUser: (request, response) => {
    console.log("viceController.getVicesForUser ", request.params.email);
    db.Vice.find({ email: request.params.email })
      .then(result => {
        console.log("Found vices: ", result);
        response.json(result);
      })
      .catch(err => {
        console.log(err);
        response.send(err);
      });
  },

  createVice: (request, response) => {
    console.log("viceController.createVice ", request.body);
    db.Vice.create(request.body)
      .then(result => {
        console.log("Created new vice: ", result);
        response.json(result);
      })
      .catch(err => {
        console.log(err);
        response.send(err);
      });
  },

  updateVice: (request, response) => {
    console.log("viceController.createVice ", request.body);
    db.Vice.findOneAndUpdate(
      { email: request.body.email, name: request.body.name },
      request.body,
      { useFindAndModify: false }
    )
      .then(result => {
        console.log("Updated vice: ", result);
        response.json(result);
      })
      .catch(err => {
        console.log(err);
        response.send(err);
      });
  },

  deleteVice: (request, response) => {
    console.log("viceController.deleteVice ", request.body);
    db.Vice.findOneAndDelete({
      email: request.body.email,
      name: request.body.name
    })
      .then(result => {
        console.log("Deleted vice: ", result);
        response.json(result);
      })
      .catch(err => {
        console.log(err);
        response.send(err);
      });
  },

  createViceEvent: (request, response) => {
    console.log("viceController.createViceEvent ", request.body);
    // Get this month
    let today = moment();

    // Figure out the month
    let thisMonth = today.format("YYYY-MM");
    console.log("This month is:", thisMonth);

    // Figure out the start of the week

    // Query database for vice document
    db.Vice.findOne({ email: request.body.email, name: request.body.name })
      .then(vice => {
        // Find monthly counter
        let monthCount = vice.monthly.find(
          monthEntry => thisMonth == monthEntry.month
        );
        if (monthCount) {
          // If present, increment counter
          monthCount.count++;
        } else {
          // If not, add it
          monthCount = { month: thisMonth, count: 1 };
          vice.monthly.push(monthCount);
        }
        console.log(vice);

        // Find weekly counter
        // If present, increment it
        // If not, add it

        // Save document back to database. Easy, huh?
        db.Vice.findOneAndUpdate(
          { email: request.body.email, name: request.body.name },
          vice,
          { useFindAndModify: false }
        )
          .then(result => {
            console.log("Updated vice: ", result);
            response.json(result);
          })
          .catch(err => {
            console.log(err);
            response.send(err);
          });
      })
      .catch(err => {
        console.log(err);
        response.send(err);
      });
  }
};

module.exports = viceController;
