var listOfTags =["vegan", "vegetarian", "ketogenic", "soup", "salad", "vegetables"]

var randomTag = listOfTags[Math.floor(Math.random() * 6)]

var unirest = require("unirest");

var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random");

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
	console.log(res.body)
    console.log("Uh oh! You have hit your limit! Here is a recipe for '" + res.body.recipes[0].title + "' " + res.body.recipes[0].sourceUrl);
    console.log("random tag is: " + randomTag)
});

