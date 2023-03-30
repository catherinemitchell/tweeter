/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


  const renderTweets = function(tweets) {
    const $tweetsContainer = $('.tweets-container');
    for (let tweet of tweets) {

      $tweetsContainer.prepend(createTweetElement(tweet));

    }
  };


  const createTweetElement = function(tweet) {
    const time = timeago.format(tweet.created_at);
    const tweetHTML = `
      <article class="tweet-container">
      <div class="tweeted-header">
        <div class="header-avatar">
          <img src=${tweet.user.avatars}>
          <span>${tweet.user.name}</span>
        </div>
        <div>
          <span>${tweet.user.handle}</span>
        </div>
      </div>
      <p class="tweet-itself">
      ${$("<p>").text(tweet.content.text).html()}
      </p>
      <footer class="tweeted-footer">
        <div>
          <span>${time}</span>
          
        </div>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
      </article>
      `;
    return tweetHTML;
  };


  $('form').on('submit', function(event) {
    event.preventDefault();


    const textArea = $(this).find("textarea").val();

    $(".ErrMsg").slideUp();

    if (textArea.length < 1) {
      $(".ErrMsg").text("Must enter your tweet!")
        .slideDown("slow");
      return;
    }

    if (textArea.length > 140) {
      $(".ErrMsg").text("Your tweet is too long!")
        .slideDown("slow");
      return;
    }

    const tweetText = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: tweetText,
      success: function() {
        $('textarea').val('');
        $('.counter').text(140);
        $.get('/tweets', (data) => {
          console.log(data.slice(-1));
          renderTweets(data.slice(-1));

        });
      }
    });
  });

  const loadTweets = function() {
    $.ajax('/tweets', {
      method: "GET",
      dataType: "json",
    })
      .then((result) => {
        renderTweets(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  loadTweets();

});






