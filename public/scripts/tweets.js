$("document").ready(() => {
  // Makes a get request to the server for all the tweets
  function loadTweets() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      error: err => {
        console.log(err);
      },
      success: data => {
        // Builds the HTML for each tweet then renders it to the page
        renderTweets(data);
      }
    });
  }
  // Clears the text property of the specified element
  function resetText($elem, val = "") {
    $elem.text(val);
    return true;
  }

  // Clears the val property of the specified element
  function resetVal($elem, val = "") {
    $elem.val(val);
    return true;
  }

  //Escapes a string so that it is not interpreted as html
  // This protects against script injection
  function escape(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Creates html for the passed in tweet object
  function createTweetElement(tweet) {
    const today = Date.now();
    let text = decodeURIComponent(tweet.content.text);
    const article = $(`
    <article>
      <header>
          <img src="${tweet.user.avatars.small}">
          <h1 class="name">${tweet.user.name}</h1>
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

  // Renders an array of tweets to the page
  function renderTweets(tweets) {
    tweets.reverse().forEach(el => {
      // Create single tweet
      const one = createTweetElement(el);
      $(".root").append(one);
    });
  }

  // Adds a single tweet to the top of the page
  function prependNew(tweet) {
    const one = createTweetElement(tweet);
    $(".root").prepend(one);
  }

  // Makes a post request to the server to create a new tweet
  function createNewTweetRecord(tweetText) {
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
  }

  // Populate the page with tweets!
  loadTweets();

  // Forces the form submit to cause an ajax request to the server
  // Clears the text on the form textarea
  $(".new-tweet").on("submit", function(e) {
    e.preventDefault();
    if (
      $(this)
        .children("textarea")
        .val()
        .trim() !== "" &&
      $(this)
        .children("textarea")
        .val()
        .trim().length < 140
    ) {
      let tweetText = $(this)
        .serialize()
        .replace(/(%20)(?!\w)/gm, "");
      // Makes sure that the tweet is not empty and it has bounded length
      createNewTweetRecord(tweetText);
      resetVal($(this).children("textarea"), "");
      resetText($(".charCount"), 140);
    } else {
      console.log("Not submitted");
      return;
    }
  });
});
