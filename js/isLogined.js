$(document).ready(function () {
  var isLoggedin = checkJSessionID();
  console.log(isLoggedin); // true 또는 false

  if (isLoggedin) {
    getUserInform();
    $("#login-nav").show();
    $("#non-login-nav").hide();
  } else {
    $("#non-login-nav").show();
    $("#login-nav").hide();
  }

  function getUserInform() {
    $.ajax({
      url: "https://ppiyong.shop/api/user",
      type: "GET",
      dataType: "json",
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
      },
      success: function (data) {
        username = data.nickName;
        $(".username-text").text(username);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("통신 실패");
        console.error(textStatus, errorThrown);
        $(".username-text").text("undefined");
      },
    });
  }
});

function checkJSessionID() {
  var cookies = document.cookie.split(";");
  var jsessionExists = false;

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf("JSESSIONID=") === 0) {
      jsessionExists = true;
      break;
    }
  }

  return jsessionExists;
}
