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

  $('#logout_btn').click(function () {
    console.log("로그아웃 버튼 클릭");
    logout();
});

    function getUserInform() {
      $.ajax({
      url: "https://ppiyong.shop/api/user",
      type: "GET",
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

function logout() {
    
        $.ajax({
        url: "https://ppiyong.shop/api/logout",
        type: "GET",
        xhrFields: {
          withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
        },
        success: function (data) {
            document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //쿠키삭제
            console.log(document.cookie);
            alert("로그아웃 성공");
            window.location.href = "/main.html"; //로그인 페이지로
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert("통신 실패");
          console.error(textStatus, errorThrown);
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

