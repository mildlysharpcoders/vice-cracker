const twilio = require("../utils/twilio");

const twilioController = {
  createTextNotification: (request, response) => {
    console.log("twilioController.createTextNotification ", request.body);
    twilio.sendTextMessage(request.body.message, request.body.tonumber);
    response.sendStatus(201);
  }
};

module.exports = twilioController;
