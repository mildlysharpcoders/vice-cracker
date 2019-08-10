require("dotenv").config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const fromPhone = process.env.TWILIO_FROM_NUMBER;


const client = require("twilio")(accountSid, authToken);

const twilio = {
  sendTextMessage: (message, tonumber) => {
    client.messages
      .create({
        body: message,
        from: fromPhone,
        to: tonumber
      })
      .then(message => console.log("Message sent", message.sid));
  }
};

module.exports = twilio;
