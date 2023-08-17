$(document).ready(function () {
  $("button[type='submit']").on("click", function (e) {
    e.preventDefault();

    var email = $("#email").val();
    console.log(email);

    var password = "임시비밀번호";

    $.ajax({
      type: "POST",
      url: `https://ppiyong.shop/api/user/findPw?email=${email}`,
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
      },
      contentType: "application/json",

      success: function (data) {
        alert("임시 비밀번호가 이메일로 전송되었습니다.");
      },
      error: function (request, status, error) {
        alert("서버 요청 실패: 서버에 문제가 발생하였습니다.");
      },
    });
  });
});
