$(document).ready(function () {
  function getMemberData() {
    return $.ajax({
      type: "GET",
      url: "https://ppiyong.shop/api/user",
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
    });
  }

  function displayMember(data) {
    const { email, nickName, region } = data;
    $("#id").val(email);
    $("#nickname").val(nickName);
    $("#regionDisplay").text(region || "지역을 선택하세요");
    $("#locationSelect").val(region);
    $("#locationSelect option[value='" + region + "']").attr("label", region);
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
    window.location.href = "../account/changePassword.html";
  });

  // 닉네임 변경
  $("#changeNickname").on("click", function () {
    var newNickname = $("#nickname").val();
    $.ajax({
      url: `https://ppiyong.shop/api/user/nickname?nickName=${newNickname}`,
      type: "PUT",
      dataType: "json",
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
      },
      success: function (data) {
        alert("닉네임이 성공적으로 변경되었습니다.");
        const nicknameDisplay = document.getElementById("nicknameDisplay");
        nicknameDisplay.textContent = newNickname;
        console.log(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("변경 실패");
      },
    });
  });
  // 지역 변경
  $("#changeRegion").on("click", function () {
    var newRegion = $("#locationSelect").val();

    // 지역 코드를 매핑하는 객체
    var regionMap = {
      서울특별시: "SEOUL",
      부산광역시: "BUSAN",
      대구광역시: "DAEGU",
      인천광역시: "INCHEON",
      광주광역시: "GWANJU",
      대전광역시: "DAEJEON",
      울산광역시: "ULSAN",
      세종특별자치시: "SEJONG",
      경기도: "GYEONGGI",
      강원특별자치도: "GANGWON",
      충청북도: "CHUNGCHEONGBUKDO",
      충청남도: "CHUNGCHEONGNAMDO",
      전라북도: "JEOLLABUKDO",
      전라남도: "JEOLLANAMDO",
      경상북도: "GYEONGSANGBUKDO",
      경상남도: "GYEONGSANGNAMDO",
      제주특별자치도: "JEJU",
    };

    // 선택한 지역을 지역 코드로 변환
    var regionCode = regionMap[newRegion];

    $.ajax({
      url: `https://ppiyong.shop/api/user/region?region=${regionCode}`,
      type: "PUT",
      dataType: "json",
      contentType: "application/json",
      data: { region: regionCode },
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
      },
      success: function (data) {
        alert("지역이 성공적으로 변경되었습니다.");
        const regionDisplay = document.getElementById("regionDisplay");
        regionDisplay.textContent = newRegion || "지역을 선택하세요";
        console.log(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("수정실패", errorThrown);
      },
    });
  });
});
