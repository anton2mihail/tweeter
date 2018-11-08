$("document").ready(() => {
  const tool = $(".tooltip");
  tool.hide();
  $(".compose").click(() => {
    $(".comp").slideToggle();
    $("#tweet").focus();
  });
  $("#tweet").on("input", () => {
    const max = 140;
    const counter = $(".charCount");
    const button = $("#postTweet");
    let cur = max - $("#tweet").val().length;
    counter.text(cur);
    if (cur < 0) {
      counter.addClass("redColor");
      button.prop("disabled", true);
      tool.slideDown().addClass("redColor");
    } else {
      counter.removeClass("redColor");
      button.prop("disabled", false);
      tool.hide().removeClass("redColor");
    }
  });
});
