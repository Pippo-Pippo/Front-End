$(document).ready(function () {
  $("button[type='submit']").on("click", function (e) {
    e.preventDefault();

    var email = $("#email").val();
    var password = $("#password").val();

    const data = {
      email: email,
      password: password,
    };

    $.ajax({
      type: "POST",
      url: "https://ppiyong.shop/api/user/login",
      data: data,
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        console.log(data);
        if (response.Id) {
          document.cookie = "Id=" + response.Id;
          alert("로그인 성공");
          window.location.href = "/main.html";
        } else {
          alert("로그인 실패: 잘못된 이메일 또는 비밀번호입니다.");
        }
      },
      error: function (req, status, err) {
        console.log(data);

        console.log(req);
        alert("서버 요청에 실패.");
      },
    });
  });
});
