let allData; // 전역변수

//뉴스 불러오기
$(document).ready(function () {
  //현재 접속 좌표 받아와서 주소로 변환하기
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    reverseGeocode(lat, lon, function (address) {
      console.log(lat, lon, address);
      $("#current_city").text(address);
    });
  });

  $.getJSON("../json/regionList.json", function (data) {
    const regionList = data;
    const convertedAddress = convertRegion(regionList, current_region);
    localStorage.setItem("converted_address", convertedAddress);
    getAllData(convertedAddress); //주소 기반으로 get요청하기
  });

  const current_region = localStorage.getItem("current_region");

  updateDateTime(); // 페이지 준비되면 현재시간 받아오기

  //get으로 받아온 데이터 로드하기
  // 버튼 이벤트 리스너
  $("#weatherButton").click(function () {
    displayCategoryData(allData.weather);
  });

  $("#earthquakeButton").click(function () {
    displayCategoryData(allData.earthquake);
  });

  $("#civilButton").click(function () {
    displayCategoryData(allData.civil);
  });

  $("#lostButton").click(function () {
    displayCategoryData(allData.lost);
  });

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
$(document).on("click", "#refresh", function () {
  window.location.reload();
});

//최초 get요청 한번만 하는 로직
function getAllData(address) {
  $.ajax({
    url: `https://ppiyong.shop/api/home?region=${address}`,
    method: "GET",
    dataType: "json",
    success: function (json) {
      allData = json;
      console.log(json);
    },
    error: function (error) {
      console.log("실패");
      console.error(error);
    },
  });
}

function getButtonBackgroundColor(button) {
  switch (button) {
    case "RAIN":
      return "bg-blue-300";
    case "HOT":
      return "bg-red-400";
    case "WIND":
      return "bg-blue-600";
    case "SNOW":
      return "bg-blue-900";
    case "EARTHQUAKE":
      return "bg-yellow-600";
    case "LOST":
      return "bg-gray-500";
    default:
      return "bg-gray-600";
  }
}

function displayCategory(category) {
  const container = $("#main");
  container
    .empty()
    .append(category.map((item) => createHTMLString(item)).join(""));

  const buttonContainers = container.find(".button-container");

  const categoryNames = {
    RAIN: "강우",
    HOT: "폭염",
    WIND: "태풍",
    SNOW: "폭설",
    EARTHQUAKE: "지진",
    CIVIL: "민방위",
    LOST: "실종자",
  };

  category.forEach((item, index) => {
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

function createHTMLString(item) {
  return `
      <!--메인 박스-->
      <div class="bg-white rounded-md shadow-md w-80 mt-5 p-4 text-lg font-bold text-start">
        <div class="flex items-center justify-between py-2">
          <div>${item.from}</div>
          <div class="text-grey-600 font-medium text-sm ml-4">${item.time}</div>
        </div>
        <div class="button-container"></div>
        <div class="flex py-2 text-start items-start text-black font-medium text-base">
          ${item.content}
        </div>
        <div class="flex items-center justify-end text-end">
          <img src="img/icon/댓글.png" class="w-4 h-3.5 mt-1 mr-4" />
          <div class="font-medium text-sm mt-1 mr-1">댓글</div>
          <div class="font-medium text-bold mt-1 mr-5 ">${item.comment}</div>
          <a href="/mainDetail.html?id=${item.id}">
            <button
              id="authButton"
              type="button"
              class="${item.id} w-14 h-7 bg-gray-600 rounded-md text-white font-medium text-sm"
            >
              더보기
            </button>
          </a>
        </div>
      </div>`;
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
