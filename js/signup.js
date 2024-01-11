function goNext() {
  const signupWarp = document.getElementById("signup-wrap");
  const signupTitle = document.getElementById("signup-title");
  const nextButton = document.getElementById("nextButton");
  // "회원가입" 내용이 사라진 후에 실행
  signupWarp.style.display = "none"; //없어지기
  signupTitle.innerHTML = "회원정보 입력"; //innerText 수정

  document.getElementById("nextButton").style.display = "none";
  document.getElementById("member").style.display = "block";
  // 닉네임, 지역 정보 보여주기
  nicknameInput.style.display = "block";
  locationDropdown.style.display = "block";
}
document.getElementById("member").addEventListener("click", function () {
  signup();
});

function signup() {
  var email = $("#email").val();
  var password = $("#password").val();
  var nickname = $("#nickname").val();
  var region = $("#region").val();
  $.ajax({
    type: "POST",
    url: "https://ppiyong.shop/api/user/register",
    contentType: "application/json",
    data: JSON.stringify({
      email: email,
      password: password,
      nickName: nickname,
      region: region,
    }),
    success: function (data) {
      alert("성공");
      console.log("success");
    },
    error: function (request, status, error) {
      alert("잘못된 요청입니다.");
      console.log("error");
    },
  });
}
document.getElementById("nextButton").addEventListener("click", function () {
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();

  if (password !== confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  if (password !== confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  goNext();
});
//이메일 인증번호
$("#authButton").on("click", function (e) {
  console.log($("input[name='email']").val());
  $.ajax({
    url: "https://ppiyong.shop/api/user/emailCheck",
    data: { email: $("input[name='email']").val() },
    xhrFields: {
      withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
    },
    type: "POST",
    success: function (data) {
      alert("이메일로 인증코드가 발송되었습니다. 인증코드를 입력해주세요.");
      $("#verificationMessage").show();
      $("#verificationInput").show();
      $("#authButton").hide();
      console.log(data);
    },
    error: function (req, status, err) {
      console.log(req);
      $("#verificationMessage").hide();
      $("#verificationInput").hide();
      alert("이메일 인증코드 발송에 실패했습니다. 다시 시도해주세요.");
    },
  });
});
$("#verifyButton").on("click", function (e) {
  var inputCode = $("#verificationCode").val();
  var email = $("input[name='email']").val();
  console.log(inputCode, email, "버튼 클릭");
  const data = {
    email: email,
    verification: inputCode,
  };
  console.log(data);
  $.ajax({
    url: "https://ppiyong.shop/api/user/verification",
    type: "POST",
    data: JSON.stringify(data),
    xhrFields: {
      withCredentials: true,
    },
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      console.log(response);

      $("#verificationConfirm").show();
      alert("인증되었습니다.");
    },
    error: function (req, status, err) {
      console.log(req);
      alert("인증번호 확인 중에 문제가 발생했습니다. 다시 시도해주세요.");
      $("#verificationConfirm").hide();
    },
  });
});
