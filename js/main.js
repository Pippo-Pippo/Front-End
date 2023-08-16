//뉴스 불러오기
$(document).ready(function () {
  const current_region = localStorage.getItem("current_region");

  $.getJSON("../json/regionList.json", function (data) {
    const regionList = data;
    const convertedAddress = convertRegion(regionList, current_region);
    localStorage.setItem("converted_address", convertedAddress);
  });

  function updateButtonColors(category) {
    const buttonColors = {
      RAIN: "bg-blue-300",
      HOT: "bg-pink-500",
      WIND: "bg-blue-300",
      SNOW: "bg-white",
      EARTHQUAKE: "bg-yellow-600",
      CIVIL: "bg-green-300",
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

  getNewsCategory();
  getWeatherCategory();
  getEarthQuakeCategory();
  getCivilCategory();
  getLostCategory();
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

//현재 좌표로 주소변환해서 추가하기 -> 그냥 배열로 받아와서 두번째 까지만 출력하도록 함 !!,
// 메인페이지에 사용할 주소 두번째 토큰까지
// 댓글달때 사용할 주소 세번째 토큰
// 체크리스트때 사용할 주소 첫번째 토큰

function reverseGeocode(lat, lng, callback) {
  const geocoder = new google.maps.Geocoder();
  const latLng = { lat: lat, lng: lng };
  let current_region = "";
  let main_current_region = "";
  let slicedAddressComponents;

  geocoder.geocode({ location: latLng }, function (results, status) {
    if (status === "OK") {
      if (results[0]) {
        const addressComponents = results[0].address_components; //원본 배열

        // "administrative_area_level_1" 조건을 만족하는 요소의 인덱스를 찾는다.
        let index = addressComponents.findIndex((component) =>
          component.types.includes("administrative_area_level_1")
        );

        // 해당 인덱스부터의 모든 요소들을 새 배열로 저장한다.
        if (index !== -1) {
          slicedAddressComponents = addressComponents.slice(1, index + 1);
        }

        console.log(slicedAddressComponents);

        // ex_ 인천광역시 부평구 삼산동 형태 저장
        for (let component of slicedAddressComponents.reverse()) {
          current_region += component.long_name + " ";
        }
        current_region = current_region.trim();
        //localStorage.removeItem("current_region");
        localStorage.setItem("current_region", current_region); // 로컬에 저장

        // ex_ 인천광역시 부평구 형태 저장
        for (let i = 0; i < slicedAddressComponents.length - 1; i++) {
          main_current_region += slicedAddressComponents[i].long_name + " ";
        }
        main_current_region = main_current_region.trim();

        callback(main_current_region);
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

  $("#weatherButton").click(); //기본값 날씨 선택
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

  $("#current_time").text(
    `${year}/${month}/${day} ${amPm} ${hour}:${minute} 기준`
  );
}

// 새로고침 버튼 누르면 페이지 reload
const refreshButton = document.getElementById("refresh");

refreshButton.addEventListener("click", function () {
  window.location.reload();
});

//버튼 색상 설정
function updateButtonColors(category) {
  const buttonColors = {
    RAIN: "bg-blue-300",
    HOT: "bg-red-400",
    WIND: "bg-blue-600",
    SNOW: "bg-gray-100",
    EARTHQUAKE: "bg-yellow-600",
    CIVIL: "bg-green-300",
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

//뉴스 불러오기
function getNewsCategory() {
  function getNewsList() {
    const convertedAddress = localStorage.getItem("converted_address");

    return $.ajax({
      type: "GET",
      url: `https://ppiyong.shop/api/home?region=${convertedAddress}`,
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
}

//날씨 불러오기
function getWeatherCategory() {
  $("#weatherButton").on("click", function () {
    const convertedAddress = localStorage.getItem("converted_address");
    const current_region = localStorage.getItem("current_region");

    $.ajax({
      url: `https://ppiyong.shop/api/home?region=${convertedAddress}`,
      method: "GET",
      dataType: "json",
      success: function (json) {
        const weatherData = json.weather;
        const filteredWeatherData = weatherData.filter((item) => {
          return (
            item.category.includes("WIND") ||
            item.category.includes("RAIN") ||
            item.category.includes("HOT") ||
            item.category.includes("SNOW")
          );
        });
        displayWeather(filteredWeatherData);
        console.log(weatherData);
      },
      error: function (error) {
        console.log("실패");
        console.error(error);
      },
    });
  });

  const categoryNames = {
    RAIN: "강우",
    HOT: "폭염",
    WIND: "태풍",
    SNOW: "폭설",
  };

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
          .text(categoryNames[category] || category);
        buttonContainer.append(button);
      }
    });
  }

  function createHTMLString(weather) {
    const buttonBackgroundColor = getButtonBackgroundColor(weather.category);

    return `
        <!--메인 박스-->
        <div class="bg-white rounded-md shadow-md w-80 mt-5 p-4 text-lg font-bold text-start">
          <div class="flex items-center justify-between py-2">
            <div>${weather.from}</div>
            <div class="text-grey-600 font-medium text-sm ml-4">${weather.time}</div>
          </div>
          <div class="button-container"></div>
          <div class="flex py-2 text-start items-start text-black font-medium text-base">
            ${weather.content}
          </div>
          <div class="flex items-center justify-end text-end">
            <img src="img/icon/댓글.png" class="w-4 h-3.5 mt-1 mr-4" />
            <div class="font-medium text-sm mt-1 mr-1">댓글</div>
            <div class="font-medium text-bold mt-1 mr-5 ">${weather.comment}</div>
            <a href="/mainDetail.html?id=${weather.id}">
              <button
                id="authButton"
                type="button"
                class="${weather.id} w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
              >
                더보기
              </button>
            </a>
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
        return "bg-blue-900";
      default:
        return "bg-gray-600";
    }
  }
}
//지진

function getEarthQuakeCategory() {
  $("#earthquakeButton").on("click", function () {
    loadEarthquake();
  });

  loadEarthquake();

  const categoryNames2 = {
    EARTHQUAKE: "지진",
  };

  function loadEarthquake() {
    const convertedAddress = localStorage.getItem("converted_address");
    const current_region = localStorage.getItem("current_region");

    $.ajax({
      url: `https://ppiyong.shop/api/home?region=${convertedAddress}`,
      method: "GET",
      dataType: "json",
      success: function (json) {
        const earthquakeData = json.earthquake;
        const filteredEarthquakeData = earthquakeData.filter((item) => {
          return item.category.includes("EARTHQUAKE");
        });
        displayEarthquake(filteredEarthquakeData);
        console.log("Received data:", earthquakeData);
      },
      error: function (error) {
        console.log("실패");
        console.error(error);
        console.log("Request failed:", error);
      },
    });
  }

  function displayEarthquake(earthquakeData) {
    const container = $("#main");
    container
      .empty()
      .append(earthquakeData.map((item) => createHTMLString(item)).join(""));

    const buttonContainers = container.find(".button-container");
    earthquakeData.forEach((item, index) => {
      const buttonContainer = buttonContainers.eq(index);
      buttonContainer.empty(); // Clear previous buttons

      const categories = item.category.split(" ");
      for (const category of categories) {
        const button = $("<button>")
          .addClass(
            `w-14 h-7 ${getButtonBackgroundColor(
              category
            )} rounded-full mr-1 text-sm font-medium text-white mb-1`
          )
          .text(categoryNames2[category] || category);
        buttonContainer.append(button);
      }
    });
  }

  function createHTMLString(earthquake) {
    const categories = earthquake.category.split(" ");
    const buttonBackgroundColor = getButtonBackgroundColor(earthquake.category);
    return `
      <!--메인 박스-->
      <div class="bg-white rounded-md shadow-md w-80 mt-5 p-4 text-lg font-bold text-start">
          <div class="flex items-center justify-between py-2">
            <div>${earthquake.from}</div>
            <div class="text-grey-600 font-medium text-sm ml-4">${earthquake.time}</div>
          </div>
          <div class="button-container"></div>
          <div class="flex py-2 text-start items-start text-black font-medium text-base">
            ${earthquake.content}
          </div>
          <div class="flex items-center justify-end text-end">
            <img src="img/icon/댓글.png" class="w-4 h-3.5 mt-1 mr-4" />
            <div class="font-medium text-sm mt-1 mr-1">댓글</div>
            <div class="font-medium text-bold mt-1 mr-5 ">${earthquake.comment}</div>
            <a href="/mainDetail.html?id=${earthquake.id}">
              <button
                id="authButton"
                type="button"
                class="${earthquake.id} w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
              >
                더보기
              </button>
            </a>
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
}

//민방위
function getCivilCategory() {
  $("#civilButton").on("click", function () {
    loadCivil();
  });

  loadCivil();

  const categoryNames = {
    CIVIL: "민방위",
  };

  function loadCivil() {
    const convertedAddress = localStorage.getItem("converted_address");
    const current_region = localStorage.getItem("current_region");

    $.ajax({
      url: `https://ppiyong.shop/api/home?region=${convertedAddress}`,
      method: "GET",
      dataType: "json",
      success: function (json) {
        const civilData = json.civil;
        const filteredCivilData = civilData.filter((item) => {
          return item.category === "CIVIL";
        });
        displayCivil(filteredCivilData);
      },
      error: function (error) {
        console.log("실패");
        console.error(error);
      },
    });
  }

  function displayCivil(civilData) {
    const container = $("#main");
    container
      .empty()
      .append(civilData.map((item) => createHTMLString(item)).join(""));

    const buttonContainers = container.find(".button-container");
    civilData.forEach((item, index) => {
      const buttonContainer = buttonContainers.eq(index);
      buttonContainer.empty(); // Clear previous buttons

      const categories = item.category.split(" ");
      for (const category of categories) {
        const button = $("<button>")
          .addClass(
            `category-button w-14 h-7 ${getButtonBackgroundColor(
              category
            )} rounded-full mr-1 text-sm font-medium text-white mb-1`
          )
          .text(categoryNames[category] || category);
        buttonContainer.append(button);
      }
    });
  }

  function createHTMLString(civil) {
    const buttonBackgroundColor = getButtonBackgroundColor(civil.category);
    return `
    <!--메인 박스-->
    <div class="bg-white rounded-md shadow-md w-80 mt-5 p-4 text-lg font-bold text-start">
        <div class="flex items-center justify-between py-2">
          <div>${civil.from}</div>
          <div class="text-grey-600 font-medium text-sm ml-4">${civil.time}</div>
        </div>
        <div class="button-container"></div>
        <div class="flex py-2 text-start items-start text-black font-medium text-base">
          ${civil.content}
        </div>
        <div class="flex items-center justify-end text-end">
          <img src="img/icon/댓글.png" class="w-4 h-3.5 mt-1 mr-4" />
          <div class="font-medium text-sm mt-1 mr-1">댓글</div>
          <div class="font-medium text-bold mt-1 mr-5 ">${civil.comment}</div>
          <a href="/mainDetail.html?id=${civil.id}">
            <button
              id="authButton"
              type="button"
              class="${civil.id} w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
            >
              더보기
            </button>
          </a>
        </div>
      </div>`;
  }

  function getButtonBackgroundColor(category) {
    switch (category) {
      case "CIVIL":
        return "bg-green-400";
      default:
        return "bg-gray-600";
    }
  }
}

//실종자
function getLostCategory() {
  $("#lostButton").on("click", function () {
    loadLost();
  });

  loadLost();

  const categoryNames3 = {
    LOST: "실종자",
  };

  function loadLost() {
    const convertedAddress = localStorage.getItem("converted_address");
    const current_region = localStorage.getItem("current_region");

    $.ajax({
      url: `https://ppiyong.shop/api/home?region=${convertedAddress}`,
      method: "GET",
      dataType: "json",
      success: function (json) {
        const lostData = json.lost;
        const filteredLostData = lostData.filter((item) => {
          return item.category === "LOST";
        });
        displayLost(filteredLostData);
      },
      error: function (error) {
        console.log("실패");
        console.error(error);
      },
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
      buttonContainer.empty(); // Clear previous buttons

      const categories = item.category.split(" ");
      for (const category of categories) {
        const button = $("<button>")
          .addClass(
            `w-14 h-7 ${getButtonBackgroundColor(
              category
            )} rounded-full mr-1 text-sm font-medium text-white mb-1`
          )
          .text(categoryNames3[category] || category);
        buttonContainer.append(button);
      }
    });
  }

  function createHTMLString(lost) {
    const buttonBackgroundColor = getButtonBackgroundColor(lost.category);
    return `
    <!--메인 박스-->
    <div class="bg-white rounded-md shadow-md w-80 mt-5 p-4 text-lg font-bold text-start">
        <div class="flex items-center justify-between py-2">
          <div>${lost.from}</div>
          <div class="text-grey-600 font-medium text-sm ml-4">${lost.time}</div>
        </div>
        <div class="button-container"></div>
        <div class="flex py-2 text-start items-start text-black font-medium text-base">
          ${lost.content}
        </div>
        <div class="flex items-center justify-end text-end">
          <img src="img/icon/댓글.png" class="w-4 h-3.5 mt-1 mr-4" />
          <div class="font-medium text-sm mt-1 mr-1">댓글</div>
          <div class="font-medium text-bold mt-1 mr-5 ">${lost.comment}</div>
          <a href="/mainDetail.html?id=${lost.id}">
            <button
              id="authButton"
              type="button"
              class="${lost.id} w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
            >
              더보기
            </button>
          </a>
        </div>
      </div>`;
  }

  function getButtonBackgroundColor(category) {
    switch (category) {
      case "LOST":
        return "bg-gray-500"; // 실종자 버튼에 맞게 수정
      default:
        return "bg-gray-600";
    }
  }
}

//색깔 결정
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
      return "bg-green-500";
    case "LOST":
      return "bg-gray-800"; // 예시로 "bg-gray-400"로 변경
    default:
      return "bg-gray-600";
  }
}
