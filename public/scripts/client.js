/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];


// const renderTweets = function(tweets) {
//   const $tweetsContainer = $('.tweets-container');
//   for (let tweet of tweets) {
//     $tweetsContainer.append(createTweetElement(tweet));
//   }
// };


// const createTweetElement = function(tweet) {
//   const tweetHTML = `
//     <article class="tweet-container">
//     <div class="tweeted-header">
//       <div class="header-avatar">
//         <img src=${tweet.user.avatars}>
//         <span>${tweet.user.name}</span>
//       </div>
//       <div>
//         <span>${tweet.user.handle}</span>
//       </div>
//     </div>
//     <div class="tweet-itself">
//     <p>${tweet.content.text}</p>
//     </div>
//     <footer class="tweeted-footer">
//       <div>
//         <span>${tweet.created_at}</span>
//       </div>
//       <div>
//         <i class="fa-solid fa-flag"></i>
//         <i class="fa-solid fa-retweet"></i>
//         <i class="fa-solid fa-heart"></i>
//       </div>
//     </footer>
//     </article>
//     `;
//   return tweetHTML;
// };

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
      <div class="tweet-itself">
      ${$("<p>").text(tweet.content.text).html()}
      </div>
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
    // const input = $('#tweet-text').val();
    console.log(this);

    const textArea = $(this).find("textarea").val()
    console.log("success", textArea);
    console.log("textAreaLength", textArea.length)
    

    if (textArea.length < 1) {
      window.alert("must enter your tweet!");
      return
    }
    
    if (textArea.length > 140) {
      window.alert("tweet is too long!");
      return
    } 

    const tweetText = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: tweetText,
      success: function() {
        $('textarea').val('')
        $('.counter').text(140)
        $.get('/tweets', (data) => {
          console.log(data.slice(-1))
          renderTweets(data.slice(-1))
          
        })
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






