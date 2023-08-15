$(document).ready(function () {
  $("button[type='submit']").on("click", function (e) {
    e.preventDefault();

    var email = $("#email").val();
    console.log(email);

    $.ajax({
      type: "POST",
      url: `https://ppiyong.shop/api/user/findPw?email=${email}`,

      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        if (response.success) {
          alert("임시 비밀번호가 이메일로 전송되었습니다.");
        } else {
          alert("비밀번호 찾기 실패: 해당 이메일 주소가 존재하지 않습니다.");
        }
      },
      error: function (xhr, status, error) {
        console.error(xhr, status, error);
        alert("서버 요청 실패: 서버에 문제가 발생하였습니다.");
      },
    });
  });
});
