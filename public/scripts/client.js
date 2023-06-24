/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
/*
const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
}; */


 const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

// Note: subject to change 
function createTweetElement(data) {
  //Assumes that JSON is being passed in
  let tweetInfo;

  if (typeof data === "string") {
    try {
      tweetInfo = JSON.parse(data);
    } catch (e) {
      console.error("Cannot parse passed data to JSON", data);
      throw e;
    }
  } else {
    tweetInfo = data;
  }

  const $tweet =
    $(`<article id="tw_${tweetInfo.user.handle}_${tweetInfo.created_at}" class="tweet">
    <header>
      <div>
      <img src="${tweetInfo.user.avatars}" alt="${tweetInfo.handle}" width="80" height="80">
        ${tweetInfo.user.name}
      </div>
      <div>${tweetInfo.user.handle}</div>
    </header>
    <div class="tweet_post_text">
      <p>${tweetInfo.content.text}</p>
    </div>
    <footer>
      <p>10 days ago</p>
      <div>
        <span class="material-symbols-outlined tweet_flag"> flag </span>
        <span class="material-symbols-outlined tweet_repeat"> repeat </span>
        <span class="material-symbols-outlined tweet_heart_plus"> heart_plus </span>
      </div>
    </footer>
  </article>`);
  return $tweet;
}

// Given an Array of Tweet data objects 
// Add each of them to the dom 
function renderTweets(tweets) {
  for (let ele of tweets) {
    const $tweet = createTweetElement(ele);
    $("#tweets-container").append($tweet);
  }
}

//Initalization function 
$(document).ready(function () {
  renderTweets(data);
});

/*Future notes will need to implement: 

- event listener 
- POST/GET request (AJAX with jquery)
- will be using JSON serialize and a parsing function to use requested JSON data


Time Passed display
- add timeago library 
- note: will need to check the version of jquery that is being used in this case
- https://cdnjs.com/libraries/jquery-timeago
- https://cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.6.7/jquery.timeago.min.js

Validation
- for post requests (from Client) - we'll need to validate
- null
- the max number of characters (ie. string.length)

Need to add Cross Site scripting protection
- see the post for details 

Error Displaying
- to be honest - I think this should have been presenting 1st as it could also help with debugging
- have a dedicated element just to display errors 
*/
