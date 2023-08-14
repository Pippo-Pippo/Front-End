//뉴스 불러오기
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

  getNewsList()
    .done(function (data) {
      const newsList = data.news;
      displayNews(newsList);

      // News rolling
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
    })
    .fail(function (error) {
      console.error("Failed to retrieve news data:", error);
      alert("통신 실패");
    });
});

//버튼 색상 설정
function updateButtonColors(category) {
  const buttonColors = {
    RAIN: "bg-blue-300",
    HOT: "bg-red-400",
    WIND: "bg-blue-600",
    SNOW: "bg-gray-100",
    EARTHQUAKE: "bg-yellow-600",
    CIVIL: "bg-yellow-100",
    LOST: "bg-gray-300",
  };

  $(".category-button").each(function () {
    const button = $(this);
    const buttonCategory = button.data("category");

    if (buttonCategory === category) {
      button.addClass(buttonColors[buttonCategory]);
    } else {
      button.removeClass(buttonColors[buttonCategory]);
    }
  });
}

$(document).ready(function () {
  function updateButtonColors(category) {
    const buttonColors = {
      RAIN: "bg-blue-300",
      HOT: "bg-pink-500",
      WIND: "bg-blue-300",
      SNOW: "bg-white",
      EARTHQUAKE: "bg-yellow-600",
      CIVIL: "bg-yellow-300",
      LOST: "bg-gray-400",
    };

    $(".category-button").each(function () {
      const button = $(this);
      const buttonCategory = button.data("category");

      if (buttonCategory === category) {
        button.addClass(buttonColors[buttonCategory]);
      } else {
        button.removeClass(buttonColors[buttonCategory]);
      }
    });
  }

  //날씨 목데이터
  function loadWeather() {
    return fetch("json/main.json")
      .then((response) => response.json())
      .then((json) => json.weather)
      .catch((error) => {
        console.log("실패");
        console.error(error);
      });
  }

  $("#weatherButton").on("click", function () {
    loadWeather().then((weatherData) => {
      const filteredWeatherData = weatherData.filter((item) => {
        return (
          item.category.includes("WIND") ||
          item.category.includes("RAIN") ||
          item.category.includes("HOT") ||
          item.category.includes("SNOW")
        );
      });
      displayWeather(filteredWeatherData);
    });
  });

  loadWeather().then((weather) => {
    displayWeather(weather);
  });

  function displayWeather(weather) {
    const container = $("#main");
    container
      .empty()
      .append(weather.map((item) => createHTMLString(item)).join(""));

    const buttonContainers = container.find(".button-container");
    weather.forEach((item, index) => {
      const buttonContainer = buttonContainers.eq(index);

      const categories = item.category.split(" ");
      for (const category of categories) {
        const button = $("<button>")
          .addClass(
            `category-button w-14 h-7 ${getButtonBackgroundColor(
              category
            )} rounded-full mr-1 text-sm font-medium text-white mb-1`
          )
          .text(category);
        buttonContainer.append(button);
      }
    });
  }

  function createHTMLString(weather) {
    const buttonBackgroundColor = getButtonBackgroundColor(weather.category);

    return `
      <!--메인 박스-->
      <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
        <div class="flex items-center justify-between">
          <div>${weather.from}</div>
          <div class="text-grey-600 font-medium text-sm ml-4">${weather.time}</div>
        </div>
        <div class="button-container"></div>
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
            class="${weather.id} w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
          >
            더보기
          </button>
        </div>
      </div>`;
  }

  function getButtonBackgroundColor(category) {
    switch (category) {
      case "RAIN":
        return "bg-blue-300";
      case "HOT":
        return "bg-red-400";
      case "WIND":
        return "bg-blue-600";
      case "SNOW":
        return "bg-gray-100";
      default:
        return "bg-gray-600";
    }
  }
});

//지진
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
        return item.category.includes("EARTHQUAKE");
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

  const buttonContainers = container.querySelectorAll(".button-container");
  earthquakeData.forEach((item, index) => {
    const buttonContainer = buttonContainers[index];

    buttonContainer.innerHTML = ""; // Clear previous buttons

    const categories = item.category.split(" ");
    for (const category of categories) {
      const button = document.createElement("button");
      button.className = `w-14 h-7 ${getButtonBackgroundColor(
        category
      )} rounded-full mr-1 text-sm font-medium text-white mb-1`;
      button.innerText = category;
      buttonContainer.appendChild(button);
    }
  });
}

function createHTMLString(earthquake) {
  const categories = earthquake.category.split(" ");
  const buttonBackgroundColor = getButtonBackgroundColor(earthquake.category);

  return `
    <!--메인 박스-->
    <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
      <div class="flex items-center justify-between">
        <div>${earthquake.from}</div>
        <div class="text-grey-600 font-medium text-sm ml-4">${earthquake.time}</div>
      </div>
      <div class="button-container"></div>
      <div class="flex items-start justify-center text-black font-medium text-base">
        ${earthquake.content}
      </div>
      <div class="flex items-center justify-end text-end">
        <img src="img/댓글.png" class="w-4 h-3.5 mt-1 mr-4" />
        <div class="font-medium text-sm mt-1 mr-1">댓글</div>
        <div class="font-medium text-bold mt-1 mr-5">${earthquake.comment}</div>
        <button
          id="authButton"
          type="button"
          class="${earthquake.id} w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
        >
          더보기
        </button>
      </div>
    </div>`;
}

function getButtonBackgroundColor(category) {
  switch (category) {
    case "EARTHQUAKE":
      return "bg-yellow-600";
    default:
      return "bg-gray-600";
  }
}

//민방위
function loadCivil() {
  return fetch("json/main.json")
    .then((response) => response.json())
    .then((json) => json.civil)
    .catch((error) => {
      console.log("실패");
      console.error(error);
    });
}

$("#civilButton").on("click", function () {
  loadCivil().then((civilData) => {
    const filteredCivilData = civilData.filter((item) => {
      return item.category === "CIVIL";
    });
    displayCivil(filteredCivilData);
  });
});

loadCivil().then((civil) => {
  displayCivil(civil);
});

function displayCivil(civilData) {
  const container = $("#main");
  container
    .empty()
    .append(civilData.map((item) => createHTMLString(item)).join(""));

  const buttonContainers = container.find(".button-container");
  civilData.forEach((item, index) => {
    const buttonContainer = buttonContainers.eq(index);

    const categories = item.category.split(" ");
    for (const category of categories) {
      const button = $("<button>")
        .addClass(
          `category-button w-14 h-7 ${getButtonBackgroundColor(
            category
          )} rounded-full mr-1 text-sm font-medium text-white mb-1`
        )
        .text(category);
      buttonContainer.append(button);
    }
  });
}

function createHTMLString(civil) {
  const buttonBackgroundColor = getButtonBackgroundColor(civil.category);

  return `
    <!--메인 박스-->
    <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
      <div class="flex items-center justify-between">
        <div>${civil.from}</div>
        <div class="text-grey-600 font-medium text-sm ml-4">${civil.time}</div>
      </div>
      <div class="button-container"></div>
      <div class="flex items-start justify-center text-black font-medium text-base">
        ${civil.content}
      </div>
      <div class="flex items-center justify-end text-end">
        <img src="img/댓글.png" class="w-4 h-3.5 mt-1 mr-4" />
        <div class="font-medium text-sm mt-1 mr-1">댓글</div>
        <div class="font-medium text-bold mt-1 mr-5">${civil.comment}</div>
        <button
          id="authButton"
          type="button"
          class="${civil.id} w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
        >
          더보기
        </button>
      </div>
    </div>`;
}

function getButtonBackgroundColor(category) {
  switch (category) {
    case "CIVIL":
      return "bg-yellow-300";
    default:
      return "bg-gray-600";
  }
}

//실종자
$("#lostButton").on("click", function () {
  loadlost().then((lostData) => {
    const filteredLostData = lostData.filter((item) => {
      return item.category === "LOST"; // 카테고리 이름에 맞게 수정
    });
    displayLost(filteredLostData);
  });
});

loadlost().then((lostData) => {
  displayLost(lostData);
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

function displayLost(lostData) {
  const container = $("#main");
  container
    .empty()
    .append(lostData.map((item) => createHTMLString(item)).join(""));

  const buttonContainers = container.find(".button-container");
  lostData.forEach((item, index) => {
    const buttonContainer = buttonContainers.eq(index);

    const categories = item.category.split(" ");
    for (const category of categories) {
      const button = $("<button>")
        .addClass(
          `category-button w-14 h-7 ${getButtonBackgroundColor(
            category
          )} rounded-full mr-1 text-sm font-medium text-white mb-1`
        )
        .text(category);
      buttonContainer.append(button);
    }
  });
}

function createHTMLString(lost) {
  const buttonBackgroundColor = getButtonBackgroundColor(lost.category);

  return `
    <!--메인 박스-->
    <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
      <div class="flex items-center justify-between">
        <div>${lost.from}</div>
        <div class="text-grey-600 font-medium text-sm ml-4">${lost.time}</div>
      </div>
      <div class="button-container"></div>
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
          class="${lost.id} w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
        >
          더보기
        </button>
      </div>
    </div>`;
}

function getButtonBackgroundColor(category) {
  switch (category) {
    case "LOST":
      return "bg-gray-300"; // 실종자 버튼에 맞게 수정
    default:
      return "bg-gray-600";
  }
}

function getButtonBackgroundColor(category) {
  switch (category) {
    case "RAIN":
      return "bg-blue-300";
    case "HOT":
      return "bg-pink-500"; // 예시로 "bg-pink-500"로 변경
    case "WIND":
      return "bg-blue-300";
    case "SNOW":
      return "bg-white";
    case "EARTHQUAKE":
      return "bg-yellow-600";
    case "CIVIL":
      return "bg-yellow-300";
    case "LOST":
      return "bg-gray-400"; // 예시로 "bg-gray-400"로 변경
    default:
      return "bg-gray-600";
  }
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
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  reverseGeocode(lat, lon, function (address) {
    console.log(lat, lon, address);
    $("#current_city").text(address);
  });
});

$(document).ready(function () {
  updateDateTime(); // 페이지 준비되면 현재시간 받아오기

  //버튼 클릭 시 글씨 색 변경
  $("#weatherButton, #earthquakeButton, #civilButton, #lostButton").click(
    function () {
      $(this).find("p").css("font-weight", "bold");

      $("#weatherButton p, #earthquakeButton p, #civilButton p, #lostButton p")
        .not($(this).find("p"))
        .css("font-weight", "normal");
    }
  );
});

// 시간 업데이트 함수
function updateDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  let hour = now.getHours();
  const minute = String(now.getMinutes()).padStart(2, "0");
  const amPm = hour < 12 ? "오전" : "오후";
  hour = hour % 12 || 12;

  $(".text-black.font-medium.text-sm").text(
    `${year}/${month}/${day} ${amPm} ${hour}:${minute} 기준`
  );
}

// 새로고침 버튼 누르면 페이지 reload
const refreshButton = document.getElementById("refresh");

refreshButton.addEventListener("click", function () {
  window.location.reload();
});
