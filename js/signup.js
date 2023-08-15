function isPasswordValid(password) {
  // 비밀번호가 8자리 이상이면서 특수문자를 포함하는지 검사
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordPattern.test(password);
}
function signup() {
 

  var email = $("#email").val();
  var password = $("#password").val();
  var nickname = $("#nickname").val();
  var region = $("#location").val();  
  var password = $("#password").val();



  $.ajax({
    type: "POST",
    url: "https://ppiyoung.shop/api/user/register",
    contentType: "application/json",
    data: JSON.stringify({
      email: email,
      password: password,
      nickname: nickname,
      region: region,
    }),
    success: function (data) {
      alert(JSON.stringify(data));

     
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

  if (!isPasswordValid(password)) {
    alert("비밀번호는 8자리 이상이며 특수문자를 포함해야 합니다.");
    return;
  }

  if (password !== confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  signup();
  nextButton.addEventListener("click", function () {
    goNext();
  });
});

//이메일 인증번호
$("#authButton").on("click", function (e) {
  console.log($("input[name='email']").val());
  $.ajax({
    url: "https://ppiyong.shop/api/user/emailCheck",
    data: { email: $("input[name='email']").val() },
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
    },
  });
});

$("#verifyButton").on("click", function (e) {
  var inputCode = $("#verificationCode").val();

  // 이메일로 인증번호 확인 요청을 보내서 서버 응답을 받아옵니다.
  $.ajax({
    url: "https://ppiyong.shop/api/user/verification",
    data: { verificationCode: inputCode, email: email }, // 이메일을 어디서 가져오는지 확인 필요
    type: "POST",
    dataType: "json",
    success: function (response) {
      if (response.success) { // 인증번호가 일치하는 경우
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
    },
  });
});

const authButton = document.getElementById("authButton");
const verificationMessage = document.getElementById(
  "verificationMessage"
);
const verificationInput = document.getElementById("verificationInput");
const verificationConfirm = document.getElementById(
  "verificationConfirm"
);
const nicknameInput = document.getElementById("nicknameInput");
const locationDropdown = document.getElementById("locationDropdown");
const nextButton = document.getElementById("nextButton");
const heading = document.querySelector(
  ".flex .items-start .text-left .text-black .font-bold .text-2xl"
);

authButton.addEventListener("click", function () {
  verificationMessage.style.display = "flex";
  verificationInput.style.display = "block";
  verificationConfirm.style.display = "none";
});

verifyButton.addEventListener("click", function () {
  verificationConfirm.style.display = "block";
});

function goNext() {
  const signupWarp = document.getElementById("signup-wrap");
  const signupTitle = document.getElementById("signup-title");
  const nextButton = document.getElementById("nextButton");
    // "회원가입" 내용이 사라진 후에 실행

  signupWarp.style.display = "none"; //없어지기
  signupTitle.innerHTML = "회원정보 입력"; //innerText 수정
  nextButton.innerHTML = "회원가입 완료!"; //innerText 수정
  // const emailInput = document.getElementById("email");
  // const verificationMessage = document.getElementById(
  //   "verificationMessage"
  // );
  // const verificationInput = document.getElementById("verificationInput");
  // const verificationConfirm = document.getElementById(
  //   "verificationConfirm"
  // );
  // const passwordInput = document.getElementById("password");
  // const authButton = document.getElementById("authButton");
  // const verifyButton = document.getElementById("verifyButton");
  // const nextButton = document.getElementById("nextButton");
  // const heading = document.querySelector(
  //   ".flex .items-start .text-left .text-black .font-bold .text-2xl"
  // );

  // //정보 사라지게 하기
  // emailInput.style.display = "none";
  // authButton.style.display = "none";
  // verificationMessage.style.display = "none";
  // verificationInput.style.display = "none";
  // verifyButton.style.display = "none";
  // verificationConfirm.style.display = "none";
  // passwordInput.style.display = "none";

  // 닉네임, 지역 정보 보여주기
  nicknameInput.style.display = "block";
  locationDropdown.style.display = "block";

  // 회원정보 입력 헤드, 버튼 이름 바꾸기
  heading.textContent = "회원정보 입력";
  nextButton.textContent = "회원가입 완료";
}
//다음 버튼
