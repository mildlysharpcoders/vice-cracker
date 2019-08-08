require("dotenv").config();
const moment = require("moment");
const db = require("../models");
const twilio = require("./twilio");

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
      result.forEach(vice => {
        console.log(vice);
      });
    })
    .catch(err => {
      console.log("sendStatusUpdates failed, here's why:");
      console.log(err);
    });
  // Loop through them and compute all the update messages
  // Send text message with all updates, if they fit...
  //moved recipe content to its on file.
}

module.exports = { start, sendEntryReminders, sendStatusUpdates };
