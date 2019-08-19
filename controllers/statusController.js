const db = require("../models");

const statusController = {
  getStatusEntries: (request, response) => {
    const email = request.params.email;
    console.log("statusController.getStatusEntries ", email);
    db.Status.find({ email }).then(result => {
        response.json(result);
    }).catch(error => {
        console.log(error);
        
    })
  }
};

module.exports = statusController;
