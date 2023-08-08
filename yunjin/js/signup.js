function signup() {
  var grantType = localStorage.getItem('grantType');
  var accessToken = localStorage.getItem('accessToken');
  var refreshToken =localStorage.getItem('refreshToken');

  var email = $('#email').val();
  var password = $('#password').val();
  var nickname = $('#nickname').val();
  var region = $('#location').val();
  $.ajax({
      type: 'POST',
      url: 'http://ppiyoung/api/user/register',
      contentType : 'application/json',
      headers: {
          'Authorization': grantType + ' ' + accessToken,
          'Refresh': refreshToken
      },
      data: JSON.stringify({
          'email' :email,
          'password' : password,
          'nickname' : nickname,
          'region' : region 
      }),
      success : function(data){
        
        alert(JSON.stringify(data)); 
  
        location.href='./login.html';
      },
      error: function(request, status, error){
        alert("잘못된 요청입니다.");
        console.log('error');
      }
  });
}


document.getElementById("nextButton").addEventListener("click", function () {
  signup();
});

//이메일 인증번호
$("#authButton").on("click", function (e) {


  $.ajax({
    url: "http://ppiyoung/api/user/emailCheck", 
    data: { "mail": $("input[name='email']").val() },
    type: "POST",
    success: function (data) {
      
      alert("이메일로 인증코드가 발송되었습니다. 인증코드를 입력해주세요.");
      $("#verificationMessage").show(); 
      $("#verificationInput").show(); 
      $("#authButton").hide(); 
    },
    error: function (req, status, err) {
      
      console.log(req);
      $("#verificationMessage").hide(); 
      $("#verificationInput").hide(); 
      alert("이메일 인증코드 발송에 실패했습니다. 다시 시도해주세요.");
    }
  });
});

$("#verifyButton").on("click", function (e) {
  
  var inputCode = $("#verificationCode").val(); 

  // 인증번호 전송하여 비교
  $.ajax({
    url: "http://ppiyoung/api/user/verification",
    data: { "verificationCode": inputCode },
    type: "POST",
    success: function (data) {
      
      if (data === "success") {
        $("#verificationConfirm").show(); 
      } else {
        alert("인증번호가 일치하지 않습니다. 다시 입력해주세요.");
        $("#verificationConfirm").hide();
      }
    },
    error: function (req, status, err) {
    
      console.log(req);
      alert("인증번호 확인에 실패했습니다. 다시 시도해주세요.");
      $("#verificationConfirm").hide();
    }
  });
});