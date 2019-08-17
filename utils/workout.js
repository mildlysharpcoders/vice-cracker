//information for the workout. 
//this may actually move!

require("dotenv").config();
const twilio = require("./twilio");
const unirest = require("unirest");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

//base url for final url
var youtubeLink = "https://www.youtube.com/watch?v="

//video ID from API
var videoId; 

//API link 
var apiUrl = "https://www.google.apis.com/youtube/v3"

let req = unirest("GET", apiUrl);

req.query({
    "part": "snippet",
    "q": "exercise",
    "maxResults" : 1
})

req.headers({
    Authorization: "Bearer " + YOUTUBE_API_KEY
        
    });
    
//this will add the video ID and the youtube link together to be used. 
var videoUrl = youtubeLink + videoId