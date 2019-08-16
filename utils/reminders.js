require("dotenv").config();
const db = require("../models");
const betteroptions = require("../models/BetterOptions");
const twilio = require("./twilio");
const { getWeeklyConsumption } = require("./viceUtils");
const { sendRecipe } = require("./recipe");
const { sendGym, sendHealthFoodStore } = require("./yelp");
const CronJob = require("cron").CronJob;

const ENTRY_TIME_HOUR = process.env.ENTRY_TIME_HOUR || 20;
const ENTRY_TIME_MINUTE = process.env.ENTRY_TIME_MINUTE || 0;

const STATUS_TIME_HOUR = process.env.STATUS_TIME_HOUR || 8;
const STATUS_TIME_MINUTE = process.env.STATUS_TIME_MINUTE || 0;

function start() {
  createCronJob(STATUS_TIME_HOUR, STATUS_TIME_MINUTE, sendStatusUpdates);
  createCronJob(ENTRY_TIME_HOUR, ENTRY_TIME_MINUTE, sendEntryReminders);
}

function createCronJob(hour, minute, callback) {
  new CronJob(`0 ${minute} ${hour} * * *`, callback, null, true, "America/Chicago");
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
