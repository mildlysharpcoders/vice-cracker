require("dotenv").config();
const moment = require("moment");
const db = require("../models");
const twilio = require("./twilio");
const { getWeeklyConsumption } = require("./viceUtils");

const ENTRY_TIME_HOUR = process.env.ENTRY_TIME_HOUR || 20;
const ENTRY_TIME_MINUTE = process.env.ENTRY_TIME_MINUTE || 0;

const STATUS_TIME_HOUR = process.env.STATUS_TIME_HOUR || 8;
const STATUS_TIME_MINUTE = process.env.STATUS_TIME_MINUTE || 0;

function start() {
  console.log("Starting reminder timer");
  // Call the callback once per minute
  setInterval(reminderCallback, 60000);
}

function checkReminder(hour, minute, callback) {
  if (moment().hour() == hour && moment().minute() == minute) {
    callback();
  }
}

function reminderCallback() {
  checkReminder(STATUS_TIME_HOUR, STATUS_TIME_MINUTE, sendStatusUpdates);
  checkReminder(ENTRY_TIME_HOUR, ENTRY_TIME_MINUTE, sendEntryReminders);
}

function sendEntryReminders() {
  db.User.find({})
    .then(result => {
      result.forEach(user => {
        sendEntryReminder(user);
      });
    })
    .catch(err => {
      console.log("sendEntryReminders failed, here's why:");
      console.log(err);
    });
}

function sendEntryReminder(user) {
  console.log("Sending entry reminder for:", user.email, user.phone);
  if (user.phone) {
    twilio.sendTextMessage(
      "Remember to enter today's consumption into the Vice Cracker!",
      user.phone
    );
  }
}

function sendStatusUpdates() {
  db.User.find({})
    .then(result => {
      result.forEach(user => {
        sendStatusUpdate(user);
      });
    })
    .catch(err => {
      console.log("sendStatusUpdates failed, here's why:");
      console.log(err);
    });
}

function sendStatusUpdate(user) {
  console.log("sendStatusUpdates for", user.email);
  // Get Vices for user here
  db.Vice.find({ email: user.email })
    .then(result => {
      if (result) {
        result.forEach(vice => {
          sendStatus(user.phone, vice);
        });
      }
    })
    .catch(err => {
      console.log("sendStatusUpdates failed, here's why:");
      console.log(err);
    });
}

function sendStatus(phone, vice) {
  console.log(vice);
  let consumption = getWeeklyConsumption(vice);
  console.log("Weekly consumption", consumption);
  if (consumption < vice.limit) {
    let message = `Great work! You're doing well with your ${vice.name} consumption. Here's to a healthier life! The Vice Cracker.`;
    twilio.sendTextMessage(message, phone);
  } else {
    sendHealthyAlternative(phone, vice);
  }
}

function sendHealthyAlternative(phone, vice) {
  switch(vice.betteroption) {
    case "Recipe":
      // Send recipe
      console.log("Send recipe here");
      break;
    default:
      // Hmmmmmm. Need to add some code to handle new betteroption
      console.log("Unsupported betteroption type:", vice.betteroption);
      break;
  }
}

module.exports = { start, sendEntryReminders, sendStatusUpdates };
