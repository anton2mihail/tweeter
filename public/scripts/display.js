$("document").ready(() => {
  // Set the error tooltip to a variable for further use
  const tool = $(".tooltip");

  // Initially hide the error tooltip
  tool.hide();

  // Click listener to handle the showing and hiding of the compose form
  $(".compose").click(() => {
    $(".comp").slideToggle();
    $("#tweet").focus();
  });

  // Handle user input as it comes in
  $("#tweet").on("input", () => {
    const max = 140;
    const counter = $(".charCount");
    const button = $("#postTweet");
    let cur =
      max -
      $("#tweet")
        .val()
        .trim().length;
    counter.text(cur);
    // If the user has entered too many characters show error tooltip and style them red
    if (cur < 0) {
      counter.addClass("redColor");
      button.prop("disabled", true);
      tool.slideDown().addClass("redColor");
    }
    // If the user has entered whitespace show appropriate error
    else if (
      $("#tweet")
        .val()
        .trim().length === 0
    ) {
      button.prop("disabled", true);
      tool.text("You cannot submit empty tweets!");
      tool.slideDown().addClass("redColor");
    }
    // Otherwise hide all error tooltips
    else {
      counter.removeClass("redColor");
      button.prop("disabled", false);
      tool.text("Max char count is 140!");
      tool.hide().removeClass("redColor");
    }
  });
});
