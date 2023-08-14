function loadRecent(address) {
  $.getJSON("../json/regionList.json", function (data) {
    const regionList = data;

    const convertedAddress = convertRegion(regionList, address);
    console.log(convertedAddress); // INCHEON

    $.ajax({
      type: "GET",
      url: `https://ppiyoung.shop/api/home?region=${convertedAddress}`,
      contentType: "application/json",
      success: function (data) {
        console.log(data);
        //최근 카테고리 하나 불러오기
      },
      error: function (request, status, error) {
        alert("잘못된 요청입니다.");
        console.log("error");
      },
    });
  });
}

$(document).ready(function () {
  const current_region = localStorage.getItem("current_region");
  if (current_region === null) {
    getRegion();
  } else {
    localStorage.getItem("current_region");
    $("#current_city").text(current_region.split(" ")[0]);
  }

  loadRecent(current_region);
});

// 지역명 변환 함수
function convertRegion(regionList, address) {
  for (let region in regionList) {
    if (address.includes(region)) {
      return regionList[region];
    }
  }
  return address; // 변환할 수 없는 경우 원래 주소 반환
}

//접속 기준 위치 가져오기
function getRegion() {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    reverseGeocode(lat, lon, function (city) {
      console.log("현재 지역 : ", city);
      $("#current_city").text(city);
    });
  });
}

//구글 GeoCoding API 사용해서 좌표 -> 주소변환 하기
function reverseGeocode(lat, lng, callback) {
  const geocoder = new google.maps.Geocoder();
  const latLng = { lat: lat, lng: lng };

  geocoder.geocode({ location: latLng }, function (results, status) {
    if (status === "OK") {
      if (results[0]) {
        const addressComponents = results[0].address_components;
        for (let component of addressComponents) {
          if (component.types.includes("administrative_area_level_1")) {
            callback(component.long_name);
            return;
          }
        }
        callback("시/도/광역시 정보를 찾을 수 없습니다.");
      } else {
        callback("결과가 없습니다.");
      }
    } else {
      callback("Geocoder failed due to: " + status);
    }
  });
}

// api/notification로 지역에 맞는 최근 알림 하나 가져오기
