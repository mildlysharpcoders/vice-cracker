const { sendEntryReminders, sendStatusUpdates, sendStreakStatusUpdates } = require("../utils/reminders");

const reminderController = {
  sendEntryReminders: (request, response) => {
    console.log("reminderController.sendEntryReminders");
    sendEntryReminders();
    response.sendStatus(200);
  },

  sendStatusReminders: (request, response) => {
    console.log("reminderController.sendStatusReminders");
    sendStatusUpdates();
    response.sendStatus(200);
  },

  sendStreakStatusReminders: (request, response) => {
    console.log("reminderController.sendStreakStatusUpdates");
    sendStreakStatusUpdates();
    response.sendStatus(200);
  }
};

module.exports = reminderController;
