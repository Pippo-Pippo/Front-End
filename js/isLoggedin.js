$(document).ready(function () {
  var isLoggedin;
  console.log(isLoggedin); // true 또는 false

  function getUserInform() {
    $.ajax({
      url: "https://ppiyong.shop/api/user",
      type: "GET",
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
      },
      success: function (data) {
        isLoggedin = false;
        $(".username-text").text(data.nickName);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 403) {
          isLoggedin = false;
        }

        console.error(textStatus, errorThrown);
        $(".username-text").text("undefined");
      },
    });
  }

  if (isLoggedin) {
    $("#login-nav").show();
    $("#non-login-nav").hide();
  } else {
    $("#non-login-nav").show();
    $("#login-nav").hide();
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
