/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    const $tweetsContainer = $('.tweets-container');
    for (let tweet of tweets) {
      $tweetsContainer.append(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweet) {
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
      <div class="tweet-itself">
      <p>${tweet.content.text}</p>
      </div>
      <footer class="tweeted-footer">
        <div>
          <span>${tweet.created_at}</span>
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

  renderTweets(data);

}); 