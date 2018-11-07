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
  function createTweetElement(tweet) {
    const today = Date.now();
    const article = $(document.createElement("article"));
    const header = $(document.createElement("header")).appendTo(article);
    const divHd = $(document.createElement("div"))
      .addClass("hd")
      .appendTo(header);
    const avatar = $(document.createElement("img"))
      .attr("src", tweet.user.avatars.small)
      .appendTo(divHd);
    const name = $(document.createElement("h1"))
      .addClass("name")
      .text(tweet.user.name)
      .appendTo(divHd);
    const handle = $(document.createElement("span"))
      .addClass("handle")
      .text(tweet.user.handle)
      .appendTo(header);
    const tweetText = $(document.createElement("p"))
      .text(decodeURIComponent(tweet.content.text))
      .appendTo(article);
    const footer = $(document.createElement("footer")).appendTo(article);
    const daysSince = $(document.createElement("small"))
      .text(
        "Posted " +
          Math.floor((today - tweet.created_at) / 1000 / 60 / 60 / 24) +
          " Days ago"
      )
      .appendTo(footer);
    const actions = $(document.createElement("div"))
      .addClass("actions")
      .appendTo(footer);
    const flag = $(document.createElement("i"))
      .addClass("fas")
      .addClass("fa-flag")
      .appendTo(actions);
    const share = $(document.createElement("i"))
      .addClass("fas")
      .addClass("fa-share")
      .appendTo(actions);
    const like = $(document.createElement("i"))
      .addClass("fas")
      .addClass("fa-thumbs-up")
      .appendTo(actions);
    return article;
  }

  function renderTweets(tweets) {
    tweets.forEach(el => {
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
    const tweetText = $(this).serialize();
    if (tweetText !== "" && tweetText.length <= 140) {
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
    } else if (tweetText.length > 140) {
    } else {
    }
  });
});
