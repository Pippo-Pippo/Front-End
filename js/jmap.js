$("#modal").hide();

var clipboard = new ClipboardJS("#btn");

clipboard.on("success", function (e) {
  console.log(e);
});

clipboard.on("error", function (e) {
  console.log(e);
});

function out() {
  document.getElementById("modal").style.display = "none";
}

const categorizedData = {
  EARTHQUAKE: [],
  CIVIL: [],
};

const EARTHQUAKE = [];
const CIVIL = [];

//현재 위치 받아오기
$(document).ready(function () {
  var location = localStorage.getItem("current_region");
  $("#current_city").text(location);

  /************지도 생성************/
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(37.56645, 126.97796), // 지도의 중심좌표 내 현위치로 바꾸기
      level: 5, // 지도의 확대 레벨
    };

  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
  if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude; // 위도
      var lon = position.coords.longitude; // 경도
      console.log(lat);
      console.log(lon);
      locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

      // 마커와 인포윈도우를 표시합니다
      displayMarker(map, locPosition);
      console.log(locPosition);
      getShelterData(map, lat, lon);
    });
  } else {
    // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
      message = "geolocation을 사용할수 없어요..";

    displayMarker(map, locPosition);
  }
  $('#all').click(function (map) {
    $("#all").css("color", "white");

  $("#earth").css("color", "#eab308");
  $("#civil").css("color", "#fca5a5");

  showMarkers(all_marker,map);
  showMarkers(all_custom,map);
  
});
$('#earth').click(function (map) {
    $("#earth").css("color", "white");

  $("#all").css("color", "#64748b");
  $("#civil").css("color", "#fca5a5");

  hideMarkers(civil_marker,map);
  hideMarkers(civil_custom,map);

  showMarkers(earthquake_marker,map);
  showMarkers(earthquake_custom,map);
  
});
$('#civil').click(function (map) {
    $("#civil").css("color", "white");

  $("#all").css("color", "#64748b");
  $("#earth").css("color", "#eab308");

  hideMarkers(earthquake_marker,map);
  hideMarkers(earthquake_custom,map);
  showMarkers(civil_marker,map);
  showMarkers(civil_custom,map);
  
});


});

// 지도에 현위치 표시하는 함수
function displayMarker(map, locPosition) {
  var image = "/img/svg/location.svg",
    image_Size = new kakao.maps.Size(30, 40), // 마커이미지의 크기입니다
    image_Option = { offset: new kakao.maps.Point(27, 69) };

  var markerImage = new kakao.maps.MarkerImage(image, image_Size, image_Option);
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
    image: markerImage,
  });

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}

/********************대피소 데이터 불러오기******************/

function getShelterData(map, lat, lon) {
  var latitude_start = lat - 0.02,
    latitude_end = lat + 0.02,
    longitude_start = lon + 0.01,
    longitude_end = lon - 0.01;

  console.log(latitude_start);
  console.log(latitude_end);
  console.log(longitude_start);
  console.log(longitude_end);

  $.ajax({
    type: "GET",
    url: `https://ppiyong.shop/api/shelter?latitude_start=${latitude_start}&latitude_end=${latitude_end}&longitude_start=${longitude_end}&longitude_end=${longitude_start}`,
    contentType: "application/json",
    success: function (data) {
      console.log(
        `https://ppiyong.shop/api/shelter?latitude_start=${latitude_start}&latitude_end=${latitude_end}&longitude_start=${longitude_end}&longitude_end=${longitude_start}`
      );
      data.forEach((item) => {
        categorizedData[item.category].push(item);
      });
      console.log(categorizedData);
      organize(map);
    },
    error: function (request, status, error) {
      console.log("통신실패");
      console.log(request);
      console.log(status);
      console.log(error);
      console.log(message);
    },
  });
}

//받아온 거 쓸 수 있게 정리
function organize(map) {
  for (var i = 0; i < categorizedData.EARTHQUAKE.length; i++) {
    EARTHQUAKE.push({
      content:
        '<div class ="label"><span class="left"></span><span class="center">' +
        categorizedData.EARTHQUAKE[i].name +
        '</span><span class="right"></span></div>',
      latlng: new kakao.maps.LatLng(
        categorizedData.EARTHQUAKE[i].latitude,
        categorizedData.EARTHQUAKE[i].longitude
      ),
      value: "지진/해일 대피시설",
      address: categorizedData.EARTHQUAKE[i].address,
      name: categorizedData.EARTHQUAKE[i].name,
      category: categorizedData.EARTHQUAKE[i].category,
    });
  }
  for (var i = 0; i < categorizedData.CIVIL.length; i++) {
    CIVIL.push({
      content:
        '<div class ="label"><span class="left"></span><span class="center">' +
        categorizedData.CIVIL[i].name +
        '</span><span class="right"></span></div>',
      latlng: new kakao.maps.LatLng(
        categorizedData.CIVIL[i].latitude,
        categorizedData.CIVIL[i].longitude
      ),
      value: "민방위 대피시설",
      address: categorizedData.CIVIL[i].address,
      name: categorizedData.CIVIL[i].name,
      category: categorizedData.CIVIL[i].category,
    });
  }
  makeCivilMaker(map);
  makeEarthMarker(map);
}

//maker list
var civil_custom = [],
  earthquake_custom = [],
  all_custom = [];

var civil_marker = [],
  earthquake_marker = [],
  all_marker = [];

//지진 마커 생성
function makeEarthMarker(map) {
  for (var i = 0; i < EARTHQUAKE.length; i++) {
    (function (index) {
      var imageYellow = "/img/svg/yellow_marker.svg", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(40, 50), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) };

      var marker_yellow = new kakao.maps.MarkerImage(
        imageYellow,
        imageSize,
        imageOption
      );

      var marker = new kakao.maps.Marker({
        map: map,
        position: EARTHQUAKE[index].latlng,
        image: marker_yellow,
        clickable: true,
      });

      marker.name = EARTHQUAKE[index].name;
      marker.address = EARTHQUAKE[index].address;
      marker.category = EARTHQUAKE[index].value;

      earthquake_marker.push(marker);
      console.log(earthquake_marker);
      all_marker.push(marker);

      marker.setMap(map);

      var customOverlay = new kakao.maps.CustomOverlay({
        position: EARTHQUAKE[index].latlng,
        content: EARTHQUAKE[index].content,
        yAnchor: 3.5,
      });

      customOverlay.setMap(map);
      earthquake_custom.push(customOverlay);
      all_custom.push(customOverlay);
      console.log(customOverlay);
      kakao.maps.event.addListener(marker, "click", function () {
        openModal(marker);
      });
    })(i);
  }
  console.log("지진 마커 생성 완");
}

//민방위 마커 생성
function makeCivilMaker(map) {
  for (var i = 0; i < CIVIL.length; i++) {
    (function (index) {
      var imageRed = "/img/svg/red_marker.svg", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(40, 50), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) };

      var marker_red = new kakao.maps.MarkerImage(
        imageRed,
        imageSize,
        imageOption
      );

      var marker = new kakao.maps.Marker({
        map: map,
        position: CIVIL[index].latlng,
        image: marker_red,
        clickable: true,
      });

      marker.name = CIVIL[index].name;
      marker.address = CIVIL[index].address;
      marker.category = CIVIL[index].value;

      civil_marker.push(marker);
      all_marker.push(marker);

      marker.setMap(map);

      var customOverlay = new kakao.maps.CustomOverlay({
        position: CIVIL[index].latlng,
        content: CIVIL[index].content,
        yAnchor: 3.5,
      });

      customOverlay.setMap(map);
      civil_custom.push(customOverlay);
      all_custom.push(customOverlay);

      kakao.maps.event.addListener(marker, "click", function () {
        openModal(marker);
      });
    })(i);
  }
  console.log("민방위 마커 생성 완");
}

/********************카테고리따라 마커 보이기 숨기기******************/

//마커 표시 or 삭제하는 함수
function showMarkers(list,map) {
  for (var i = 0; i < list.length; i++) {
    list[i].setMap(map);
  }
}

function hideMarkers(list,map) {
  for (var i = 0; i < list.length; i++) {
    list[i].setMap(null);
  }
}

// function earthquake(map) {
//   $("#earth").css("color", "white");

//   $("#all").css("color", "#64748b");
//   $("#civil").css("color", "#fca5a5");

//   hideMarkers(civil_marker,map);
//   hideMarkers(civil_custom,map);

//   showMarkers(earthquake_marker,map);
//   showMarkers(earthquake_custom,map);

  
// }
// function civil(map) {
//   $("#civil").css("color", "white");

//   $("#all").css("color", "#64748b");
//   $("#earth").css("color", "#eab308");

//   hideMarkers(earthquake_marker,map);
//   hideMarkers(earthquake_custom,map);
//   showMarkers(civil_marker,map);
//   showMarkers(civil_custom,map);

  
// }
// function go(map) {
//   $("#all").css("color", "white");

//   $("#earth").css("color", "#eab308");
//   $("#civil").css("color", "#fca5a5");

//   showMarkers(all_marker,map);
//   showMarkers(all_custom,map);
// }


/********************마커 정보창 뜨게 하기******************/
function openModal(marker) {
  // the first inner div
  console.log(marker.name);
  console.log(marker.address);
  console.log(marker.category);

  const div1 = document.getElementById("name");
  div1.innerText = marker.name;
  const div2 = document.getElementById("textArea");
  div2.innerText = marker.address;
  const div3 = document.getElementById("category_btn");
  div3.innerHTML = marker.category;

  const btn = $("#category_btn");
  if (marker.category == "민방위 대피시설") {
    btn.attr(
      "class",
      "h-8 bg-red-400 item-center rounded-full text-xs ml-5 px-4 p-2 mb-2 text-white font-bold mt-1"
    );
  } else {
    btn.attr(
      "class",
      "h-8 bg-yellow-600 item-center rounded-full text-xs ml-5 px-4 p-2 mb-2 text-white font-bold mt-1"
    );
  }

  document.getElementById("modal").style.display = "flex";
}
