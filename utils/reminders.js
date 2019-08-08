require("dotenv").config();
const moment = require("moment");
const db = require("../models");

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
        })
    })
    .catch(err => {
      console.log("sendEntryReminders failed, here's why:");
      console.log(err);
    });
}

function sendEntryReminder(user) {
    console.log("Sending entry reminder for:", user.email);
}

function sendStatusUpdates() {
    db.User.find({})
      .then(result => {
          result.forEach(user => {
              sendStatusUpdate(user);
          })
      })
      .catch(err => {
        console.log("sendEntryReminders failed, here's why:");
        console.log(err);
      });
  }

  function sendStatusUpdate(user) {
    // Get Vices for user here
    // Loop through them and compute all the update messages
    // Send text message with all updates, if they fit...

    //Rika - update fits if they go over their consumption
    //Will have the random recipe from here and will also give the user the link to the 
    //recipe to visit.

    //Gym - can send work outs or gym locations
var unirest = require("unirest");

//going to add an array of tags
//use random math to select a tag to use to send the random recipe link

var listOfTags =["vegan", "vegetarian", "ketogenic", "vegetables", "soup", "salad"]

var randomTag = listOfTags[Math.floor(Math.random() * 6)]

var req = unirest("GET", 
"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random");

req.query({
	"number": "1",
	"tags": randomTag
});

req.headers({
	"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
	"x-rapidapi-key": "516f6ef862msh309e9b9830971c9p1bfbb7jsn89525d5813e3"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);
  console.log("Uh oh! You have hit your limit! Here is a recipe! " + 
  res.body.recipes[0].sourceUrl);
  console.log("random tag is: " + randomTag)

  //need to figure out how to send this to twilio
  
});

  }

module.exports = start;
