require("dotenv").config();
const moment = require("moment");
const db = require("../models");
const betteroptions = require("../models/BetterOptions");
const twilio = require("./twilio");
const { getWeeklyConsumption } = require("./viceUtils");
const { sendRecipe } = require("./recipe");
const { sendGym, sendHealthFoodStore } = require("./yelp");

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
          sendStatus(vice, user);
        });
      }
    })
    .catch(err => {
      console.log("sendStatusUpdates failed, here's why:");
      console.log(err);
    });
}

function sendStatus(vice, user) {
  let consumption = getWeeklyConsumption(vice);
  if (consumption < vice.limit) {
    let message = `Great work! You're doing well with your ${
      vice.name
    } consumption. Here's to a healthier life! The Vice Cracker.`;
    twilio.sendTextMessage(message, user.phone);
  } else {
    sendHealthyAlternative(vice, user);
  }
}

function sendHealthyAlternative(vice, user) {
  let betteroption = vice.betteroption;
  while (betteroption == "Random") {
    const index = Math.floor(Math.random() * betteroptions.length);
    betteroption = betteroptions[index];
  }

  switch (betteroption) {
    case "Recipe":
      sendRecipe(vice, user);
      break;
    case "Gym":
      sendGym(vice, user);
      break;
    case "Health Food Store":
      sendHealthFoodStore(vice, user);
      break;
    default:
      // Hmmmmmm. Need to add some code to handle new betteroption
      console.log("Unsupported betteroption type:", betteroption);
      break;
  }
}

module.exports = { start, sendEntryReminders, sendStatusUpdates };
