$.getJSON("/articles", function (data) {

  for (var i = 0; i < data.length; i++) {

    $("#article-space").append("<h3 data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</h3>");
  }
});

$(document).on("click", "h3", function () {
  console.log("test");
  $("#comment-space").empty();

  var thisId = $(this).attr("data-id");
  console.log(thisId);
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {
      console.log(data);

      $("#comment-space").append("<h3>" + data.title + "</h3>");
      $("#comment-space").append("<input id='titleinput' name='title' >");
      $("#comment-space").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#comment-space").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");

      if (data.comment) {

        $("#titleinput").val(data.comment.title);
        $("#bodyinput").val(data.comment.body);
      }
    });
});

$(document).on("click", "#savecomment", function () {

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {

      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })

    .then(function (data) {

      console.log(data);

      $("#comment-space").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});