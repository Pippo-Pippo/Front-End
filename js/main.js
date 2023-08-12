$(document).ready(function () {
  var height = $(".newsList").height();
  var move = 0;
  var noticeRollingOff;

  function noticeRolling() {
    move += height;
    $(".news-list").animate({ top: -move }, 600, function () {
      if (move >= $(".news-list li").length * height) {
        $(this).css("top", 0);
        move = 0;
      }
    });
  }

  noticeRollingOff = setInterval(noticeRolling, 3000);

  $(".news-list_stop").click(function () {
    clearInterval(noticeRollingOff);
  });

  $(".news-list_start").click(function () {
    noticeRollingOff = setInterval(noticeRolling, 1000);
  });

  //json (뉴스)
  function loadnews() {
    return fetch("json/main.json")
      .then((response) => response.json())
      .then((json) => json.news)
      .catch((error) => {
        console.log("실패");
        console.error(error);
      });
  }

  loadnews().then((news) => {
    displayNews(news);
  });

  function displayNews(news) {
    console.log(news);
    const container = document.getElementById("news-item");
    container.innerHTML = news.map((item) => createHTMLString(item)).join("");
  }

  function createHTMLString(news) {
    console.log("createhtml");
    return `
      <li class="news-item">
        <a href="#" class="link">${news.content}</a>
      </li>`;
  }
});

// json (날씨)
function loadWeather() {
  return fetch("json/main.json")
    .then((response) => response.json())
    .then((json) => json.weather)
    .catch((error) => {
      console.log("실패");
      console.error(error);
    });
}

document.getElementById("weatherButton").addEventListener("click", function () {
  loadWeather().then((weatherData) => {
    filteredWeatherData = weatherData.filter((item) => {
      return (
        item.category === "WIND" ||
        item.category === "RAIN" ||
        item.category === "HOT" ||
        item.category === "SNOW"
      );
    });
    displayWeather(filteredWeatherData);
  });
});
loadWeather().then((weather) => {
  displayWeather(weather);
});

function displayWeather(weather) {
  console.log(weather);
  const container = document.getElementById("main");
  container.innerHTML = weather.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(weather) {
  return `
    <!--메인 박스-->
    <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
      <div class="flex items-center justify-between">
        <div>${weather.from}</div>
        <div class="text-grey-600 font-medium text-sm ml-4">${weather.time}</div>
      </div>
      <!--파란, 회색 버튼-->
      <button class="w-14 h-7 bg-blue-300 rounded-full mr-1 text-sm font-medium text-white mb-1">
      ${weather.category}
      </button>
      <button class="w-14 h-7 bg-gray-600 mt-1 rounded-full text-sm font-medium text-white mb-1">
      ${weather.category}
      </button>
      <div class="flex items-start justify-center text-black font-medium text-base">
        ${weather.content}
      </div>
      <div class="flex items-center justify-end text-end">
        <img src="img/댓글.png" class="w-4 h-3.5 mt-1 mr-4" />
        <div class="font-medium text-sm mt-1 mr-1">댓글</div>
        <div class="font-medium text-bold mt-1 mr-5">${weather.comment}</div>
        <button
          id="authButton"
          type="button"
          class="w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
        >
          더보기
        </button>
      </div>
    </div>`;
}

// json (지진/해일)
function loadEarthquake() {
  return fetch("json/main.json")
    .then((response) => response.json())
    .then((json) => json.earthquake)
    .catch((error) => {
      console.log("실패");
      console.error(error);
    });
}

document
  .getElementById("earthquakeButton")
  .addEventListener("click", function () {
    loadEarthquake().then((earthquakeData) => {
      const filteredEarthquakeData = earthquakeData.filter((item) => {
        return item.category === "EARTHQUAKE" || item.category === "TSUNAMI";
      });
      displayEarthquake(filteredEarthquakeData);
    });
  });

loadEarthquake().then((earthquakeData) => {
  displayEarthquake(earthquakeData);
});

function displayEarthquake(earthquakeData) {
  const container = document.getElementById("main");
  container.innerHTML = earthquakeData
    .map((item) => createHTMLString(item))
    .join("");
}

function createHTMLString(earthquake) {
  return `
    <!--메인 박스-->
    <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
      <div class="flex items-center justify-between">
        <div>${earthquake.from}</div>
        <div class="text-grey-600 font-medium text-sm ml-4">${earthquake.time}</div>
      </div>
      <!--파란, 회색 버튼-->
      <button class="w-14 h-7 bg-blue-300 rounded-full mr-1 text-sm font-medium text-white mb-1">
      ${earthquake.category}
      </button>
      <button class="w-14 h-7 bg-gray-600 mt-1 rounded-full text-sm font-medium text-white mb-1">
        예보
      </button>
      <div class="flex items-start justify-center text-black font-medium text-base">
      ${earthquake.category}
      </div>
      <div class="flex items-center justify-end text-end">
        <img src="img/댓글.png" class="w-4 h-3.5 mt-1 mr-4" />
        <div class="font-medium text-sm mt-1 mr-1">댓글</div>
        <div class="font-medium text-bold mt-1 mr-5">${earthquake.comment}</div>
        <button
          id="authButton"
          type="button"
          class="w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
        >
          더보기
        </button>
      </div>
    </div>`;
}

//민방위
document.getElementById("civilButton").addEventListener("click", function () {
  loadcivil().then((civilData) => {
    const filteredcivilData = civilData.filter((item) => {
      return item.category === "CIVIL";
    });
    displayCivil(civilData);
  });
});

loadcivil().then((civilData) => {
  displayCivil(civilData);
});

function loadcivil() {
  return fetch("json/main.json")
    .then((response) => response.json())
    .then((json) => json.civil)
    .catch((error) => {
      console.log("실패");
      console.error(error);
    });
}

function displayCivil(civilData) {
  const container = document.getElementById("main");
  container.innerHTML = civilData
    .map((item) => createHTMLString(item))
    .join("");
}

function createHTMLString(civil) {
  return `
    <!--메인 박스-->
    <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
      <div class="flex items-center justify-between">
        <div>${civil.from}</div>
        <div class="text-grey-600 font-medium text-sm ml-4">${civil.time}</div>
      </div>
      <!--파란, 회색 버튼-->
      <button class="w-14 h-7 bg-blue-300 rounded-full mr-1 text-sm font-medium text-white mb-1">
      ${civil.category}
      </button>
      <button class="w-14 h-7 bg-gray-600 mt-1 rounded-full text-sm font-medium text-white mb-1">
        예보
      </button>
      <div class="flex items-start justify-center text-black font-medium text-base">
      ${civil.category}
      </div>
      <div class="flex items-center justify-end text-end">
        <img src="img/댓글.png" class="w-4 h-3.5 mt-1 mr-4" />
        <div class="font-medium text-sm mt-1 mr-1">댓글</div>
        <div class="font-medium text-bold mt-1 mr-5">${civil.comment}</div>
        <button
          id="authButton"
          type="button"
          class="w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
        >
          더보기
        </button>
      </div>
    </div>`;
}
//실종자
document.getElementById("lostButton").addEventListener("click", function () {
  loadlost().then((lostData) => {
    const filteredlostData = lostData.filter((item) => {
      return item.category === "LOST";
    });
    displaylost(lostData);
  });
});

loadlost().then((lostData) => {
  displaylost(lostData);
});

function loadlost() {
  return fetch("json/main.json")
    .then((response) => response.json())
    .then((json) => json.lost)
    .catch((error) => {
      console.log("실패");
      console.error(error);
    });
}

function displaylost(lostData) {
  const container = document.getElementById("main");
  container.innerHTML = lostData.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(lost) {
  return `
    <!--메인 박스-->
    <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
      <div class="flex items-center justify-between">
        <div>${lost.from}</div>
        <div class="text-grey-600 font-medium text-sm ml-4">${lost.time}</div>
      </div>
      <!--파란, 회색 버튼-->
      <button class="w-14 h-7 bg-blue-300 rounded-full mr-1 text-sm font-medium text-white mb-1">
      ${lost.category}
      </button>
      <button class="w-14 h-7 bg-gray-600 mt-1 rounded-full text-sm font-medium text-white mb-1">
      ${lost.category}
      </button>
      <div class="flex items-start justify-center text-black font-medium text-base">
        ${lost.content}
      </div>
      <div class="flex items-center justify-end text-end">
        <img src="img/댓글.png" class="w-4 h-3.5 mt-1 mr-4" />
        <div class="font-medium text-sm mt-1 mr-1">댓글</div>
        <div class="font-medium text-bold mt-1 mr-5">${lost.comment}</div>
        <button
          id="authButton"
          type="button"
          class="w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
        >
          더보기
        </button>
      </div>
    </div>`;
}

//현재 좌표로 주소변환해서 추가하기
function reverseGeocode(lat, lng, callback) {
  const geocoder = new google.maps.Geocoder();
  const latLng = { lat: lat, lng: lng };

  geocoder.geocode({ location: latLng }, function (results, status) {
    if (status === "OK") {
      if (results[0]) {
        const addressComponents = results[0].address_components;
        console.log(addressComponents);

        let city = null; // 시/도/광역시 정보를 저장할 변수
        let district = null; // 구/군 정보를 저장할 변수
        let sub_district = null; // 구/군 정보를 저장할 변수

        for (let component of addressComponents) {
          if (component.types.includes("administrative_area_level_1")) {
            city = component.long_name;
            console.log(city);
          }
          if (
            component.types.includes("sublocality_level_1") ||
            component.types.includes("locality")
          ) {
            district = component.long_name;
            console.log(district);
          }
          if (component.types.includes("sublocality_level_2")) {
            sub_district = component.long_name;
            console.log(sub_district);
          }
        }

        if (city && district && sub_district) {
          callback(`${city} ${district} ${sub_district}`);
        } else if (city && district) {
          callback(`${city} ${district} `);
        } else if (city) {
          callback(city);
        } else {
          callback("시/도/광역시 또는 구/군 정보를 찾을 수 없습니다.");
        }
      } else {
        callback("결과가 없습니다.");
      }
    } else {
      callback("Geocoder failed due to: " + status);
    }
  });
}

//현재 접속 좌표 받아와서 주소로 변환하기
navigator.geolocation.getCurrentPosition(function (position) {
  // const lat = position.coords.latitude;
  // const lon = position.coords.longitude;

  const lat = 37.0201013;
  const lon = 127.09279;

  reverseGeocode(lat, lon, function (address) {
    console.log(lat, lon, address);
    $("#current_city").text(address);
  });
});
