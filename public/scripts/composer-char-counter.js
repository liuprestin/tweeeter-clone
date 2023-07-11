$(document).ready(function() {
    $('#tweet_text').on("input", function() {
        $('#tweet_counter').val(140 - $(this).val().length)
    })
  });