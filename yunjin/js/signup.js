function signup() {
    var grantType = localStorage.getItem('grantType');
    var accessToken = localStorage.getItem('accessToken');
    var refreshToken =localStorage.getItem('refreshToken');

    var email = $('#inputEmail').val();
    var password = $('#inputPassword').val();
    var nickname =$('#inputNickname').val();
    var region =$('#selectLocation').val();
    $.ajax({
        type: 'POST',
        url: 'api/user/register',
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
    })
}