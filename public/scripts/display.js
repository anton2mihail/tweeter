$("document").ready(() => {
  console.log("Document ready");
  const tool = $(".tooltip");
  $(".comp").hide();
  tool.hide();
  $(".compose").click(() => {
    $(".comp").toggle();
  });
  $("#tweet").on("input", () => {
    const max = 140;
    const counter = $(".charCount");
    const button = $("#postTweet");
    let len = $("#tweet").val().length;
    let cur = max - len;
    counter.text(cur);
    if (cur < 0) {
      counter.addClass("redColor");
      button.prop("disabled", true).addClass("buttonFade");
      tool.show().addClass("show");
    } else {
      counter.removeClass("redColor");
      button.prop("disabled", false).removeClass("buttonFade");
      tool.hide().removeClass("show");
    }
  });
});
