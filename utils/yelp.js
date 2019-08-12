require("dotenv").config();
const twilio = require("./twilio");
const unirest = require("unirest");

const YELP_API_KEY = process.env.YELP_API_KEY;
const YELP_GYM = "gym";

function sendGym(vice, user) {
  console.log("Sending gym to email: ", user.email);
  const location = `${user.address}, ${user.city}, ${user.state}`;
  const url = "https://api.yelp.com/v3/businesses/search";

  let req = unirest("GET", url);
  req.query({
    term: YELP_GYM,
    location
  });

  req.headers({
    Authorization: "Bearer " + YELP_API_KEY
  });

  req.end(function(response) {
    if (response.error) {
      console.log(response.error);
    } else {
      let sorted = response.body.businesses.sort(
        (a, b) => a.distance - b.distance
      );
      const randomGym = sorted[Math.floor(Math.random() * sorted.length)];
      let message =
        "The Vice Cracker says you've exceeded your " +
        vice.name +
        " consumption for the week. Try this local gym for a good workout: " +
        randomGym.name +
        " (" +
        randomGym.url +
        ")";
      twilio.sendTextMessage(message, user.phone);
    }
  });
}

module.exports = { sendGym };
