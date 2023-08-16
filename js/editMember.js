// function editMember() {
//   return fetch("../json/editMember.json")
//     .then((response) => response.json())
//     .catch((error) => {
//       console.log("실패");
//       console.error(error);
//     });
// }

// editMember().then((data) => {
//   displayMember(data);
// });

// function displayMember(data) {
//   console.log();
//   const container = document.getElementById("Member");
//   container.innerHTML = createHTMLString(data);
//   console.log(data);
// }

// function createHTMLString(data) {
//   console.log("createhtml");
//   const { nickname, region } = data;
//   const nicknameInput = document.getElementById("nickname");
//   const locationSelect = document.getElementById("locationSelect");
//   const regionDisplay = document.getElementById("regionDisplay");
//   const idInput = document.getElementById("id");

//   nicknameInput.value = nickname;
//   regionDisplay.textContent = region || "지역을 선택하세요"; 


//   locationSelect.innerHTML = '';


//   const defaultOption = document.createElement("option");
//   defaultOption.value = "";
//   defaultOption.disabled = true;
//   defaultOption.selected = true;
//   defaultOption.textContent = memberData.region || "지역을 선택하세요";
//   locationSelect.appendChild(defaultOption);


//   const regions = [
//     "서울특별시",
//     "부산광역시",
//     "대구광역시",
//     "인천광역시",
//     "광주광역시",
//     "대전광역시",
//     "울산광역시",
//     "세종특별자치시",
//     "경기도",
//     "강원특별자치도",
//     "충청북도",
//     "충청남도",
//     "전라북도",
//     "전라남도",
//     "경상북도",
//     "경상남도",
//     "제주특별자치시도",

//   ];

//   regions.forEach((regionOption) => {
//     const option = document.createElement("option");
//     option.value = regionOption;
//     option.textContent = regionOption;
//     locationSelect.appendChild(option);
//   });


//   if (region) {
//     locationSelect.value = region;
//   }


//   locationSelect.addEventListener("change", function () {
//     regionDisplay.textContent = locationSelect.value;
//   });
//  idInput.value = data.email; 
//   return '';
// }


// const memberData = {
//   "email": "jiyun@naver.com",
//   "nickname": "지윤",
//   "region": "경상북도"
// };

  //ajax 
  $(document).ready(function () {
    
    function getMemberData() {
      return $.ajax({
        type: "GET",
        url: "https://ppiyong.shop/api/user", 
        dataType: "json",
      });
    }
  
    function displayMember(data) {
      const { email, nickname, region } = data;
      $("#id").val(email);
      $("#nickname").val(nickname);
      $("#regionDisplay").text(region || "지역을 선택하세요");
      $("#locationSelect").val(region);
    }
  
    getMemberData()
      .done(function (data) {
        console.log(data);
        displayMember(data);
       
      })
      .fail(function (xhr, status, error) {
        console.error(xhr, status, error);
        alert("서버 요청 실패: 서버에 문제가 발생하였습니다.");
      });
  
  // 비밀번호 변경
  $("#change").on("click", function () {
    var newPassword = $("#password").val();

    $.ajax({
      type: "PUT",
      url: "https://ppiyong.shop/api/user/pw",
      data: JSON.stringify({
        password: newPassword,
      }),
      xhrFields: {
        withCredentials: true,
      },
      contentType: "application/json",
      dataType: "json",
    })
      .done(function (response) {
        if (response.success) {
          alert("비밀번호가 성공적으로 변경되었습니다.");
          window.location.href = "/login.html";
        } else {
          alert("비밀번호 변경 실패: 서버에서 문제가 발생하였습니다.");
        }
      })
      .fail(function (xhr, status, error) {
        console.error(xhr, status, error);
        alert("서버 요청 실패: 서버에 문제가 발생하였습니다.");
      });
  });

   // 닉네임 변경
   $("#changeNickname").on("click", function () {
    var newNickname = $("#nickname").val();

    $.ajax({
      type: "PUT",
      url: "https://ppiyong.shop/api/user/nickname",
      data: JSON.stringify({
        nickname: newNickname,
      }),
      xhrFields: {
        withCredentials: true,
      },
      contentType: "application/json",
      dataType: "json",
    })
      .done(function (response) {
        if (response.success) {
          alert("닉네임이 성공적으로 변경되었습니다.");
          const nicknameDisplay = document.getElementById("nicknameDisplay");
          nicknameDisplay.textContent = newNickname;
        } else {
          alert("닉네임 변경 실패: 서버에서 문제가 발생하였습니다.");
        }
      })
      .fail(function (xhr, status, error) {
        console.error(xhr, status, error);
        alert("서버 요청 실패: 서버에 문제가 발생하였습니다.");
      });
  });
  // 지역 변경
  $("#changeRegion").on("click", function () {
    var newRegion = $("#locationSelect").val();
  
    // 지역 코드를 매핑하는 객체
    var regionMap = {
      "서울특별시": "SEOUL",
      "부산광역시": "BUSAN",
      "대구광역시": "DAEGU",
      "인천광역시": "INCHEON",
      "광주광역시": "GWANJU",
      "대전광역시": "DAEJEON",
      "울산광역시": "ULSAN",
      "세종특별자치시": "SEJONG",
      "경기도": "GYEONGGI",
      "강원특별자치도": "GANGWON",
      "충청북도": "CHUNGCHEONGBUKDO",
      "충청남도": "CHUNGCHEONGNAMDO",
      "전라북도": "JEOLLABUKDO",
      "전라남도": "JEOLLANAMDO",
      "경상북도": "GYEONGSANGBUKDO",
      "경상남도": "GYEONGSANGNAMDO",
      "제주특별자치도": "JEJU"
    };
  
    //지역선택
    // 선택한 지역을 지역 코드로 변환
    var regionCode = regionMap[newRegion];
  
    $.ajax({
      type: "PUT",
      url: `https://ppiyong.shop/api/user/region?=${location}`,
      data: JSON.stringify({
        region: regionCode, 
      }),
      xhrFields: {
        withCredentials: true,
      },
      contentType: "application/json",
      dataType: "json",
    })
      .done(function (response) {
        if (response.success) {
          alert("지역이 성공적으로 변경되었습니다.");
          const regionDisplay = document.getElementById("regionDisplay");
          regionDisplay.textContent = newRegion || "지역을 선택하세요";
        } else {
          alert("지역 변경 실패: 서버에서 문제가 발생하였습니다.");
        }
      })
      .fail(function (xhr, status, error) {
        console.error(xhr, status, error);
        alert("서버 요청 실패: 서버에 문제가 발생하였습니다.");
      });
  });
  
  });