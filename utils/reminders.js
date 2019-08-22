require("dotenv").config();
const db = require("../models");
const betteroptions = require("../models/BetterOptions");
const twilio = require("./twilio");
const { getWeeklyConsumption, getStreakLength } = require("./viceUtils");
const { sendRecipe } = require("./recipe");
const { sendGym, sendHealthFoodStore } = require("./yelp");
const { storeStatusUpdate } = require("./status");
const CronJob = require("cron").CronJob;
const { sendWorkout } = require("./youtube");

const ENTRY_TIME_HOUR = process.env.ENTRY_TIME_HOUR || 20;
const ENTRY_TIME_MINUTE = process.env.ENTRY_TIME_MINUTE || 0;

const STATUS_TIME_HOUR = process.env.STATUS_TIME_HOUR || 8;
const STATUS_TIME_MINUTE = process.env.STATUS_TIME_MINUTE || 0;

function start() {
  createCronJob(
    STATUS_TIME_HOUR,
    STATUS_TIME_MINUTE,
    "0",
    sendStreakStatusUpdates
  );
  createCronJob(
    STATUS_TIME_HOUR,
    STATUS_TIME_MINUTE,
    "*",
    sendConsumptionStatusUpdates
  );
  createCronJob(ENTRY_TIME_HOUR, ENTRY_TIME_MINUTE, "*", sendEntryReminders);
}

function createCronJob(hour, minute, dayOfWeek, callback) {
  new CronJob(
    `0 ${minute} ${hour} * * ${dayOfWeek}`,
    callback,
    null,
    true,
    "America/Chicago"
  );
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

function sendConsumptionStatusUpdates() {
  sendStatusUpdates(sendConsumptionStatus);
}

function sendStreakStatusUpdates() {
  sendStatusUpdates(sendStreakStatus);
}

function sendStatusUpdates(sendStatus) {
  db.User.find({})
    .then(result => {
      result.forEach(user => {
        sendStatusUpdate(user, sendStatus);
      });
    })
    .catch(err => {
      console.log("sendStatusUpdates failed, here's why:");
      console.log(err);
    });
}

function sendStatusUpdate(user, sendStatus) {
  db.Vice.find({ email: user.email })
    .then(result => {
      if (result) {
        result.forEach(vice => {
          sendStatus(vice, user);
        });
      }
    })
    .catch(err => {
      console.log("sendStatusUpdate failed, here's why:");
      console.log(err);
    });
}

function sendConsumptionStatus(vice, user) {
  let consumption = getWeeklyConsumption(vice);
  if (consumption < vice.limit) {
    let message = `Great work! You're doing well with your ${
      vice.name
    } consumption. Here's to a healthier life! The Vice Cracker.`;
    twilio.sendTextMessage(message, user.phone);
    storeStatusUpdate(message, "", "", user);
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
    case "Youtube":
      sendWorkout(vice, user);
      break;
    default:
      // Hmmmmmm. Need to add some code to handle new betteroption
      console.log("Unsupported betteroption type:", betteroption);
      break;
  }
}

function sendStreakStatus(vice, user) {
  let length = getStreakLength(vice);
  if (length > 1) {
    let message = `Great work! You're on a streak of ${length} weeks below your limit with your ${
      vice.name
    } consumption. Keep it up! The Vice Cracker.`;
    twilio.sendTextMessage(message, user.phone);
    storeStatusUpdate(message, "", "", user);
  }
}

module.exports = {
  start,
  sendEntryReminders,
  sendConsumptionStatusUpdates,
  sendStreakStatusUpdates
};
