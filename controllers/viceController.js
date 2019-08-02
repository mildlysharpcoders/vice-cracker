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
    let date = moment().format("YYYY-MM-DD");
    console.log("Vice event date", date);
    db.Vice.findOneAndUpdate(
      { email: request.body.email, name: request.body.name },
      { $push: { details: date } },
      { useFindAndModify: false }
    )
      .then(result => {
        response.json(result);
      })
      .catch(err => {
        console.log(err);
        response.send(err);
      });
  }
};

module.exports = viceController;
