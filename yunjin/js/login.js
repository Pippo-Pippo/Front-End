$(document).ready(function() {
  
  $("button[type='submit']").on("click", function (e) {
    e.preventDefault(); 

    var email = $('#email').val();
    var password = $('#password').val();

    $.ajax({
      type: "POST",
      url: "http://ppiyoung/api/user/login",
      data: JSON.stringify({
        'email': email,
        'password': password,
      }),
      contentType: "application/json", 
      dataType: "json", 
      success: function (response) {
        
        if (response.Id) {
          document.cookie = "Id=" + response.Id; 
          alert('로그인 성공');
          window.location.href = "/main.html";
        } else {
          alert('로그인 실패: 잘못된 이메일 또는 비밀번호입니다.');
        }
      },
      error: function (xhr, status, error) {
        console.error(xhr, status, error);
        alert('서버 요청 실패: 서버에 문제가 발생하였습니다.');
      }
    });
  });
});


