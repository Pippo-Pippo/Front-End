function getDisaster() {
  console.log("getDisaster");
}

//접속 기준 위치
navigator.geolocation.getCurrentPosition(function (position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  reverseGeocode(lat, lon, function (city) {
    console.log(city);
    $("#current_city").text(city);
  });
});

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

// 예제 사용:

// api/notification로 지역에 맞는 최근 알림 하나 가져오기
