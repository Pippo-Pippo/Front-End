$(document).ready(function() {
    $("button[type='submit']").on("click", function(e) {
      e.preventDefault();
  
      var newPassword = $('#password').val();
      var newPasswordConfirmation = $('#passwordConfirmation').val();
  
      if (newPassword !== newPasswordConfirmation) {
        alert('새 비밀번호와 재입력한 비밀번호가 일치하지 않습니다.');
        return;
      }
     
  
    
  
      $.ajax({
        type: "PUT", 
        url: "https://ppiyong.shop/api/user/pw",
        data: JSON.stringify({
          'password': newPassword,
        }),
        contentType: "application/json",
        dataType: "json",
        success: function(response) {
          if (response.success) {
            alert('비밀번호가 성공적으로 변경되었습니다.');
        
            window.location.href = "/main.html";
          } else {
            alert('비밀번호 변경 실패: 서버에서 문제가 발생하였습니다.');
          }
        },
        error: function(xhr, status, error) {
          console.error(xhr, status, error);
          alert('서버 요청 실패: 서버에 문제가 발생하였습니다.');
        }
      });
    });
  });