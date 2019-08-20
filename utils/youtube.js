require("dotenv").config();
var fs = require("fs");
var readline = require("readline");
var { google } = require("googleapis");
const twilio = require("./twilio");
const { storeStatusUpdate } = require("./status");

var OAuth2 = google.auth.OAuth2;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ["https://www.googleapis.com/auth/youtube"];
var TOKEN_DIR =
  (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) +
  "/.credentials/";
var TOKEN_PATH = TOKEN_DIR + "youtube-nodejs-quickstart.json";

// Load client secrets from a local file.
fs.readFile("utils/client_secret.json", function processClientSecrets(
  err,
  content
) {
  if (err) {
    console.log("Error loading client secret file: " + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  authorize(JSON.parse(content), sendWorkout);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url: ", authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log("Error while trying to retrieve access token", err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != "EEXIST") {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
    if (err) throw err;
    console.log("Token stored to " + TOKEN_PATH);
  });
  console.log("Token stored to " + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function sendWorkout(auth) {
  var workOuts = [
    "Yoga",
    "Cardio",
    "Zumba",
    "Tae Bo",
    "Richard Simmons",
    "Work out"
  ];
  var randomWorkOut = workOuts[Math.floor(Math.random() * 6)];

  var service = google.youtube("v3");
  service.search.list(
    {
      auth: auth,
      part: "snippet,id",
      q: randomWorkOut,
      maxResults: "49"
    },
    function(err, response) {
      if (err) {
        console.log("The API returned an error: " + err);
        return;
      }
      var search = response.data.items;
      var setofNumbers = [];

      for (i = 0; i < 50; i++) {
        setofNumbers.push(i);
      }

      var randomId = setofNumbers[Math.floor(Math.random() * setofNumbers.length)];
      if (search.length == 0) {
        console.log("No search results found.");
      } else {
        //for(i = 0; i < 10; i++)
        console.log(
          "Oh no! You have gone over your consumptions! Here is workout from '%s', and " +
            "%s" +
            " Visit our page at https://www.youtube.com/watch?v=%s" +
            " We have a total of %s videos on our page. I am viewing ID " +
            randomId,
          //channels[0].id,
          search[randomId].snippet.title,
          search[randomId].snippet.description,
          search[randomId].id.videoId
        );
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
    }
  );
}

module.exports = { sendWorkout };
