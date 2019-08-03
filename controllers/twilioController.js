require("dotenv").config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const fromPhone = process.env.TWILIO_FROM_NUMBER;

const client = require("twilio")(accountSid, authToken);

const twilioController = {
  createTextNotification: (request, response) => {
    console.log("twilioController.createTextNotification ", request.body);
    sendTextMessage(request.body.message, request.body.tonumber);
    response.sendStatus(201);
  }
};

function sendTextMessage(message, tonumber) {
  client.messages
    .create({
      body: message,
      from: fromPhone,
      to: tonumber
    })
    .then(message => console.log(message.sid));
}

module.exports = twilioController;
