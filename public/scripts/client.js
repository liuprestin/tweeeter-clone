// Tweeter client.js
// AJAX calls to sync to server and update the HTML view
// Libraries used:
// jquery
// timeago.js - https://github.com/hustcc/timeago.js

//Global data store
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
//returns Error Message or "False"
function checkTweetError(data) {
  let errorMsg;

  if(!data || data === ""){
    errorMsg = "<div class='error-area'>Tweet Cannot be blank.</div>";
    return errorMsg;
  }
  if (typeof data != "string") {
    errorMsg = "<div class='error-area'>Tweet is not a string.</div>";

    return errorMsg
  }

  if ((typeof data == "string") && data.length > 140) {
    errorMsg = "<div class='error-area'>Tweet cannot be larger than 140 characters, including spaces.</div>";
    return errorMsg;
  }
  
  return false;
}

// Registers event to Submit Tweets to the server
function eventSubmitTweet() {
  $("#tweet_form").on("submit", function (event) {
    event.preventDefault();

    // Validation and Error checking 
    const tweetText = $("#tweet_text").val();
    const errorMsg = checkTweetError(tweetText);
    if (errorMsg) {
      $(".error-area").remove();
      $(this).before(errorMsg).hide().slideDown();
      return;
    } else {
      $(".error-area").remove(); 
    }

    // If ok send to the Server
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

