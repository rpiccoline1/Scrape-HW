$.getJSON("/articles", function (data) {
  
  for (var i = 0; i < data.length; i++) {
    
    $("#article-space").append("<h3 data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</h3>");
  }
});

$(document).on("click", "h3", function () {
 console.log("test");
  $(".modal-body").empty();
  
  var thisId = $(this).attr("data-id");
console.log(thisId);
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {
      console.log(data);
      
      $(".modal-body").append("<h2>" + data.title + "</h2>");
      $(".modal-body").append("<input id='titleinput' name='title' >");
      $(".modal-body").append("<textarea id='bodyinput' name='body'></textarea>");
      $(".modal-body").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      if (data.note) {

        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#savenote", function () {

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
    
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});