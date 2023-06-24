// Tweeter client.js
// AJAX calls to sync to server and update the HTML view
// Libraries used:
// jquery
// timeago.js - https://github.com/hustcc/timeago.js

//Global data store - not elegant...
let data;

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

  const tweetDate = timeago.format(data.created_at);

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
      <p> ${tweetDate} </p>
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

//loadtweets to a dataObject
function loadTweets() {
  let urlStr = "/tweets";

  $.ajax({
    type: "GET",
    url: urlStr,
    success: function (result) {
      data = result;
      renderTweets(result);
    },
    error: function (error) {
      console.log(error);
    },
  });
  //return the response
}

//check the tweet
//returns true or false
//the tweet cannot be longer than 140 characters including spaces
function validateTweet(data) {
  if (!data && typeof data == "string") {
    if (data.length < 140) {
      return true;
    }
  }
  return false;
}

// Registers event to Submit Tweets to the server
function eventSubmitTweet() {
  $("#tweet_form").on("submit", function (event) {
    event.preventDefault();

    const tweetText = $("#tweet_text").val();
    if (validateTweet(tweetText)) {
      alert("Tweet must be less than 140 characters or not a blank tweet");
      return;
    }

    const formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
      success: function (result) {
        loadTweets();
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
}

//Initalization function
$(document).ready(function () {
  loadTweets();

  //EVENT handlers
  eventSubmitTweet();
});

/*Future notes will need to implement: 

Need to add Cross Site scripting protection
- see the post for details 

Error Displaying
- to be honest - I think this should have been presenting 1st as it could also help with debugging
- have a dedicated element just to display errors 
*/
