$("document").ready(() => {
  function loadTweets() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      error: function(err) {
        console.log(err);
      },
      success: function(data) {
        renderTweets(data);
      }
    });
  }
  loadTweets();
  function escape(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  function createTweetElement(tweet) {
    const today = Date.now();
    let text = decodeURIComponent(tweet.content.text);
    const article = $(`
    <article>
      <header>
        <div class="hd">
          <img src="${tweet.user.avatars.small}">
          <h1 class="name">${tweet.user.name}</h1>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <p>${escape(text)}</p>
      <footer>
        <small>${"Posted " +
          Math.floor((today - tweet.created_at) / 1000 / 60 / 60 / 24) +
          " Days ago"}</small>
        <div class="actions">
          <i class="fas fa-flag"></i>
          <i class="fas fa-share"></i>
          <i class="fas fa-thumbs-up"></i>
        </div>
      </footer>
    </article>
    `);
    return article;
  }

  function renderTweets(tweets) {
    tweets.reverse().forEach(el => {
      const one = createTweetElement(el);
      $(".root").append(one);
    });
  }
  function prependNew(tweet) {
    const one = createTweetElement(tweet);
    $(".root").prepend(one);
  }

  $(".new-tweet").on("submit", function(e) {
    e.preventDefault();
    let tweetText = $(this).serialize();
    console.log(tweetText);
    if (tweetText !== "tweet=" && decodeURIComponent(tweetText).length <= 146) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: { text: tweetText },
        error: err => {
          console.log(err);
        },
        success: data => {
          prependNew(data);
        }
      });
      $(this)
        .children("textarea")
        .val("");
      $(".comp").slideToggle();
    } else if (tweetText.length > 140) {
    } else {
    }
  });
});
