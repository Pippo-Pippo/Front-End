$(document).ready(function() {
  $("button[type='submit']").on("click", function(e) {
      e.preventDefault();

      var password = $('#password').val();
      var passwordConfirmation = $('#passwordConfirmation').val();

      if (password !== passwordConfirmation) {
        alert('새 비밀번호와 재입력한 비밀번호가 일치하지 않습니다.');
        return;
    }
    

    $.ajax({
        type: 'PUT',
        url: "https://ppiyong.shop/api/user/pw",
        contentType: 'application/json',
        data: JSON.stringify({
            'password': password,
        }),
        success: function(data){
            alert('비밀번호가 성공적으로 변경되었습니다.');
            window.location.href = "/main.html";

        },  error: function(xhr, status, error) {
            if (xhr.status === 403) {
              alert('권한 없는 유저입니다.'); 
            } else {
              alert('서버 요청 실패: 서버에 문제가 발생하였습니다.');
            }
          }
    })
  });
});