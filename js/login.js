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
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (response) {
        alert("로그인 성공");
        window.location.href = "/main.html";

        // if (response.Id) {
        //   document.cookie = "Id=" + response.Id;
        //   alert("로그인 성공");
        //
        // } else {
        //   alert("로그인 실패: 잘못된 이메일 또는 비밀번호입니다.");
        // }
      },
      error: function (req, status, err) {
        const alert = JSON.parse(req.responseText);
        console.log(status, err);
        alert(alert.message);
      },
    });
  });
});
