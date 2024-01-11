$(document).ready(function () {
  var isLoggedin;
  getUserInform();

  $("#non-login-nav").show();
  $("#login-nav").hide();
});

function getUserInform() {
  $.ajax({
    url: "https://ppiyong.shop/api/user",
    type: "GET",
    xhrFields: {
      withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
    },
    success: function (data) {
      isLoggedin = true;
      $(".username-text").text(data.nickName);

      $("#login-nav").show();
      $("#non-login-nav").hide();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 403) {
        isLoggedin = false;

        $("#non-login-nav").show();
        $("#login-nav").hide();
      }

      console.error(textStatus, errorThrown);
      $(".username-text").text("undefined");
    },
  });
}

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

$('.logout_btn').click(function () {
  console.log("로그아웃 버튼 클릭");
  logout();
});
function logout() {
    
        $.ajax({
        url: "https://ppiyong.shop/api/user/logout",
        type: "GET",
        async: false,
        xhrFields: {
          withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
        },
        success: function (data) {
            document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //쿠키삭제
            console.log(document.cookie);
            alert("로그아웃 성공");
            isLoggedin=false;
            localStorage.clear();
            window.location.href = "https://page.ppiyong.shop/main.html"; //로그인 페이지로
        },
        error: function (jqXHR, textStatus, errorThrown) {
          document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //쿠키삭제
            console.log(document.cookie);
            alert("로그아웃 성공");
            isLoggedin=false;
            localStorage.clear(); //로컬스토리지 비우기
            window.location.href = "https://page.ppiyong.shop/main.html";
          
          console.error(textStatus, errorThrown);
        },
      }); 
    }
