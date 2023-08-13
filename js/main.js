$(document).ready(function () {
  function getNewsList() {
    return $.ajax({
      type: "GET",
      url: "https://ppiyong.shop/api/home",
      dataType: "json",
    });
  }

  function displayNews(news) {
    const container = document.getElementById("news-item");
    container.innerHTML = news.map((item) => createHTMLString(item)).join("");
  }

  function createHTMLString(news) {
    return `
      <li class="news-item">
        <a href="${news.url}" class="link">${news.title}</a>
      </li>`;
  }

  getNewsList().done(function (data) {
    const newsList = data.news;
    displayNews(newsList);

    // News rolling functionality
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
    alert("통신 성공");

  }).fail(function (error) {
    console.error("Failed to retrieve news data:", error);
    alert("통신 실패");
  });
});

// json (날씨)
$(document).ready(function () {
  function loadWeather() {
    return $.ajax({
      type: "GET",
      url: "https://ppiyong.shop/api/home",
      dataType: "json",
    });
  }

  $("#weatherButton").on("click", function () {
    loadWeather()
      .done(function (weatherData) {
        const filteredWeatherData = weatherData.weather.filter((item) => {
          return (
            item.category === "WIND" ||
            item.category === "RAIN" ||
            item.category === "HOT" ||
            item.category === "SNOW"
          );
        });
        displayWeather(filteredWeatherData);
        alert("통신 성공");
        console.log(weatherData);
      })
      .fail(function () {
        alert("통신 실패");
      });
  });

  loadWeather()
    .done(function (weatherData) {
      displayWeather(weatherData.weather);
    })
    .fail(function () {
      alert("통신 실패");
    });

  function displayWeather(weatherData) {
    const container = $("#main");
    container.empty().append(weatherData.map((item) => createHTMLString(item)).join(""));
  }

  function createHTMLString(weatherData) {
    return `
      <!--메인 박스-->
      <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
        <div class="flex items-center justify-between">
          <div>${weatherD.from}</div>
          <div class="text-grey-600 font-medium text-sm ml-4">${weather.time}</div>
        </div>
        <!--파란, 회색 버튼-->
        <button class="w-14 h-7 ${
          weather.category === "RAIN" || weather.category === "SNOW"
            ? "bg-blue-300"
            : "bg-gray-600"
        } rounded-full mr-1 text-sm font-medium text-white mb-1">
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
});

// json (지진/해일)
$(document).ready(function () {
  function loadEarthquake() {
    return $.ajax({
      type: "GET",
      url: "https://ppiyong.shop/api/home",
      dataType: "json",
    });
  }

  $("#earthquakeButton").on("click", function () {
    loadEarthquake()
      .done(function (earthquakeData) {
        const filteredEarthquakeData = earthquakeData.earthquake.filter((item) => {
          return item.category === "EARTHQUAKE" || item.category === "TSUNAMI";
        });
        displayEarthquake(filteredEarthquakeData);
        alert("통신 성공");
      })
      .fail(function () {
        alert("통신 실패");
      });
  });

  loadEarthquake()
    .done(function (earthquakeData) {
      displayEarthquake(earthquakeData.earthquake);
    })
    .fail(function () {
      alert("통신 실패");
    });

  function displayEarthquake(earthquakeData) {
    const container = $("#main");
    container.empty().append(earthquakeData.map((item) => createHTMLString(item)).join(""));
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
        <button class="w-14 h-7 ${
          earthquake.category === "EARTHQUAKE" || earthquake.category === "TSUNAMI"
            ? "bg-blue-300"
            : "bg-gray-600"
        } rounded-full mr-1 text-sm font-medium text-white mb-1">
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
});

//민방위
$(document).ready(function () {
  function loadCivil() {
    return $.ajax({
      type: "GET",
      url: "https://ppiyong.shop/api/home",
      dataType: "json",
    });
  }

  $("#civilButton").on("click", function () {
    loadCivil().done(function (civilData) {
      const filteredCivilData = civilData.filter((item) => {
        return item.category === "CIVIL";
      });
      displayCivil(filteredCivilData);
      alert("통신 성공"); 
    })
    .fail(function () {
      alert("통신 실패"); 
    });
  });

  function displayCivil(civilData) {
    const container = $("#main");
    container.empty().append(civilData.map((item) => createHTMLString(item)).join(""));
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
});

//실종자
$(document).ready(function () {
  function loadlost() {
    return $.ajax({
      type: "GET",
      url: "https://ppiyong.shop/api/home", 
      dataType: "json",
    });
  }

  $("#lostButton").on("click", function () {
    loadlost()
      .done(function (lostData) {
        const filteredlostData = lostData.filter((item) => {
          return item.category === "LOST";
        });
        displaylost(filteredlostData);
        alert("통신 성공"); 
      })
      .fail(function () {
        alert("통신 실패"); 
      });
  });

  loadlost()
    .done(function (lostData) {
      displaylost(lostData);
      alert("데이터 가져오기"); 
    })
    .fail(function () {
      alert("데이터 못 가져옴"); 
    });

  function displaylost(lostData) {
    const container = $("#main");
    container.empty().append(lostData.map((item) => createHTMLString(item)).join(""));
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
});

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
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  reverseGeocode(lat, lon, function (address) {
    console.log(lat, lon, address);
    $("#current_city").text(address);
  });
});

//버튼 클릭 시 글씨 색 변경
$(document).ready(function() {

  $("#weatherButton, #earthquakeButton, #civilButton, #lostButton").click(function() {

    $(this).find("p").css("font-weight", "bold");
    
 
    $("#weatherButton p, #earthquakeButton p, #civilButton p, #lostButton p")
      .not($(this).find("p"))
      .css("font-weight", "normal");
  });
});

// 새로고침 버튼 누르면 시간 바뀌게 하는 js
const refreshButton = document.getElementById("refresh");


refreshButton.addEventListener("click", () => {
 
  const now = new Date();

 
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); 
  const day = String(now.getDate()).padStart(2, "0"); 


  let hour = now.getHours();
  const minute = String(now.getMinutes()).padStart(2, "0"); 
  const amPm = hour < 12 ? "오전" : "오후";
  hour = hour % 12 || 12; 

 
  const dateTimeElement = document.querySelector(".text-black.font-medium.text-sm");
  dateTimeElement.textContent = `${year}/${month}/${day} ${amPm} ${hour}:${minute} 기준`;
});