require("dotenv").config();
const moment = require("moment");

const ENTRY_TIME_HOUR = process.env.ENTRY_TIME_HOUR || 20;
const ENTRY_TIME_MINUTE = process.env.ENTRY_TIME_MINUTE || 0;

const STATUS_TIME_HOUR = process.env.STATUS_TIME_HOUR || 8;
const STATUS_TIME_MINUTE = process.env.STATUS_TIME_MINUTE || 0;

function start() {
  console.log("Starting reminder timer");
  setInterval(reminderCallback, 60000);
}

function entryReminder() {
    console.log("It's entry time!");
}

function statusUpdate() {
    console.log("It's status time!");
}

function checkReminder(hour, minute, callback) {
    if (moment().hour() == hour && moment().minute() == minute) {
        callback();
    }
  }

function reminderCallback() {
    checkReminder(STATUS_TIME_HOUR, STATUS_TIME_MINUTE, statusUpdate);
    checkReminder(ENTRY_TIME_HOUR, ENTRY_TIME_MINUTE, entryReminder);
}

module.exports = start;
