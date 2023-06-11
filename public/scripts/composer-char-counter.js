$(document).ready(function() {
    console.log("test");
    $('#tweet_text').on("input", function() {
        $('#tweet_counter').val(140 - $(this).val().length)
    })
  });