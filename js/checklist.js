function getDisaster() {
  console.log("getDisaster");
}

//접속 기준 위치
navigator.geolocation.getCurrentPosition(function (position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(lat, lon);
});

//구글 GeoCoding API 사용해서 좌표 -> 주소변환 하기

// api/notification로 지역에 맞는 최근 알림 하나 가져오기
