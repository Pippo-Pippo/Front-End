function loadRecent(address) {
  $.getJSON("../json/regionList.json", function (data) {
    const regionList = data;

    const convertedAddress = convertRegion(regionList, address);
    console.log(convertedAddress); // INCHEON

    $.ajax({
      url: `https://ppiyong.shop/api/home?region=${convertedAddress}`,
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);

        const recent = recentDisaster(data);
        $("#recent-disaster").text(mappingRegionName(recent));
      },
      error: function (error) {
        console.log("실패");
        console.error(error);
      },
    });
  });
}

function mappingRegionName(key) {
  const categoryNames = {
    RAIN: "강우",
    HOT: "폭염",
    WIND: "태풍",
    SNOW: "폭설",
    EARTHQUAKE: "지진",
    CIVIL: "민방위",
    LOST: "실종자",
  };

  return categoryNames[key] || "알 수 없음"; // 매핑된 값이 없을 경우 "알 수 없음" 반환
}

function recentDisaster(data) {
  function parseDate(dateStr) {
    const [datePart, period, timePart] = dateStr.split(" ");
    const [hour, minute] = timePart.split(":");
    const adjustedHour =
      period === "오후" && hour !== "12"
        ? (parseInt(hour) + 12).toString()
        : hour;
    return new Date(`${datePart}T${adjustedHour}:${minute}:00`);
  }

  const categories = ["weather", "earthquake", "civil", "lost"];

  let latestDate = new Date(0); // 초기값을 1970-01-01로 설정
  let latestCategory = null;

  categories.forEach((category) => {
    data[category].forEach((item) => {
      const itemDate = parseDate(item.time);
      if (itemDate > latestDate) {
        latestDate = itemDate;
        latestCategory = item.category;
      }
    });
  });

  return latestCategory;
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
