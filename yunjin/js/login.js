var email = $('#email').val();
var password = $('#password').val();

$.ajax({
  type: "POST",
  url: "/api/user/login",
  data: JSON.stringify({
		'email' : email,
		'password' : password,
        }),
  success: function(arg) {
    
    if (arg.Id) {

      document.cookie = "Id=" + arg.Id;
    }
    alert('id 전송 성공');
  },
  error: function(arg) {
    alert('잘못된 요청입니다.');
  }
});