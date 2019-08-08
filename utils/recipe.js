//Rika - update fits if they go over their consumption
    //Will have the random recipe from here and will also give the user the link to the 
    //recipe to visit.

    //Gym - can send work outs or gym locations

    //I put my api information here, should that go here
    // or should that be called by another function and this part should only display the message
    // that is going back to twilio
    // or sending the results back to the twilio.js file

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
  console.log("Uh oh! You have hit your limit! Here is a recipe for '" + res.body.recipes[0].title 
  + "' " + res.body.recipes[0].sourceUrl);
  console.log("random tag is: " + randomTag)

  //need to figure out how to send this to twilio
  
});