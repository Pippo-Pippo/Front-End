$(document).ready(function () {
  $("button[type='submit']").on("click", function (e) {
    e.preventDefault();

    var email = $("#email").val();
    var password = $("#password").val();

    const data = {
      email: "email",
      password: "password",
    };

    $.ajax({
      type: "POST",
      url: "https://ppiyong.shop/api/user/login",
      data: JSON.stringify(data),
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
      },
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
        alert("로그인 성공");
        //console.log(response.cookie("SESSION_ID"));
      },
      error: function (req, status, err) {
        //const alert = JSON.parse(req.responseText);
        console.log(status, err);
        //alert(alert.message);
      },
    });
  });
});

async function getHeader(url) {
  const headerData = await fetch(url);
  return headerData.headers;
}
