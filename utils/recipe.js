require("dotenv").config();

const unirest = require("unirest");
const twilio = require("./twilio");
const { storeStatusUpdate } = require("./status");
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

const listOfTags = [
  "vegan",
  "vegetarian",
  "ketogenic",
  "vegetables",
  "soup",
  "salad"
];

function sendRecipe(vice, user) {
  const randomTag = listOfTags[Math.floor(Math.random() * listOfTags.length)];

  let req = unirest(
    "GET",
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random"
  );

  req.query({
    number: "1",
    tags: randomTag
  });

  req.headers({
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": SPOONACULAR_API_KEY
  });

  req.end(function(res) {
    if (res.error) {
      console.log(res.error);
    } else {
      const hrefName = res.body.recipes[0].title;
      const href = res.body.recipes[0].sourceUrl;
      const message =
        "The Vice Cracker says you've exceeded your " +
        vice.name +
        " consumption for the week. Here is a recipe for ";
        const textMessage = message + hrefName + " (" + href + ")";
        twilio.sendTextMessage(textMessage, user.phone);
        storeStatusUpdate(message, hrefName, href, user);
      }
  });
}

module.exports = { sendRecipe };
