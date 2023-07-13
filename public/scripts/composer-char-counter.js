$(document).ready(function() {
    $('#tweet_text').on("input", function() {
        $('#tweet_counter').val(140 - $(this).val().length)
        if( $(this).val().length > 100) {
            // visually show user is beyond threshold
            $('#tweet_counter').css('color', 'red');
          } else {
            $('#tweet_counter').css('color', 'black'); 
          }
    })  
  });