require("dotenv").config();
const axios = require("axios");
const twilio = require("./twilio");
const { storeStatusUpdate } = require("./status");
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const workOuts = [
  "Yoga",
  "Cardio",
  "Zumba",
  "Tae Bo",
  "Richard Simmons",
  "Work out"
];


function sendWorkout(vice, user) {
  var randomWorkOut = workOuts[Math.floor(Math.random() * 6)];

  var queryUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet%2C%20id&maxResults=49&q=" 
  + randomWorkOut + "&key=" + YOUTUBE_API_KEY;
    axios.get(queryUrl).then(
        function(response){
          var search = response.data.items;
          var setofNumbers = [];
    
          for (i = 0; i < 50; i++) {
            setofNumbers.push(i);
          }

          var randomId = setofNumbers[Math.floor(Math.random() * setofNumbers.length)];
          let message =
          "The Vice Cracker says you've exceeded your " +
          vice.name +
          " consumption for the week. Here is a workout from Youtube: ";
        let hrefName = search[randomId].snippet.title;
        let href =
          "https://www.youtube.com/watch?v=" +
          search[randomId].id.videoId +
          "" +
          search[randomId].snippet.description;
        let textMessage = message + hrefName + "(" + href + ")";
        twilio.sendTextMessage(textMessage, user.phone);
        storeStatusUpdate(message, hrefName, href, user);

        }
    
    )
}

module.exports = { sendWorkout };
