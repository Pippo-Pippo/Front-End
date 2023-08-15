$("#modal").hide();

var clipboard = new ClipboardJS('#btn');

clipboard.on('success', function (e) {
    console.log(e);
});

clipboard.on('error', function (e) {
    console.log(e);
});


function out() {
    document.getElementById("modal").style.display = "none";
}

//현재 위치 받아오기
$(document).ready(function () {
    var location = localStorage.getItem("current_region");
    $("#current_city").text(location);
});

/********************마커 생성하기 + 커스텀 오버레이 생성******************/
//마커 기본 설정 
var imageRed = '/img/svg/red_marker.svg', // 마커이미지의 주소입니다
    imageYellow = '/img/svg/yellow_marker.svg',
    imageSize = new kakao.maps.Size(40, 50), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(27, 69) },
    image = '/img/svg/location.svg';

var marker_yellow = new kakao.maps.MarkerImage(imageYellow, imageSize, imageOption);
var marker_red = new kakao.maps.MarkerImage(imageRed, imageSize, imageOption);
/************지도 생성************/
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.56645, 126.97796), // 지도의 중심좌표 내 현위치로 바꾸기
        level: 7 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

/************현재 위치 생성************/
// HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
if (navigator.geolocation) {

    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {

        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition);

    });

} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = 'geolocation을 사용할수 없어요..'

    displayMarker(locPosition);
}

// 지도에 현위치 표시하는 함수
function displayMarker(locPosition) {
    var image = '/img/svg/location.svg';
    var markerImage = new kakao.maps.MarkerImage(image, imageSize, imageOption);
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage
    });


    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
}

/************현재 위치 주소 받아오기************/

// // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다



/********************대피소 데이터 불러오기******************/
const categorizedData = {
    "EARTHQUAKE": [],
    "CIVIL": []
};

const EARTHQUAKE = [];
const CIVIL = [];

// $.getJSON("../json/map.json", function (data) {
//     data.forEach(item => {
//         categorizedData[item.category].push(item);
//     });
//     console.log(categorizedData);
// });

$(document).ready(function () {
    var bounds = map.getBounds();
    bounds.toString();
    var latitude_start = (bounds.oa).toFixed(1),
        longitude_start = (bounds.qa).toFixed(1),
        latitude_end = (bounds.ha).toFixed(1),
        longitude_end = (bounds.pa).toFixed(1);
        console.log(latitude_start);
        console.log(longitude_start);
        console.log(latitude_end);
        console.log(longitude_end);


    $.ajax({
        type: "GET",
        url: `https://ppiyong.shop/api/shelter?latitude_start=${latitude_start}&longitude_start=${longitude_start}&latitude_end=${latitude_end}&longitude_end=${longitude_end}`,
        contentType: "application/json",
        success: function (data) {
            data.forEach(item => {
                categorizedData[item.category].push(item);
            });
            console.log(categorizedData)
        },
        error: function (request, status, error) {
            console.log("통신실패");
            console.log(request);
            console.log(status);
            console.log(error);
            console.log(message);
        }
    });
});

//받아온 거 쓸 수 있게 정리
$(document).ready(function () {
    for (var i = 0; i < categorizedData.EARTHQUAKE.length; i++) {
        EARTHQUAKE.push({
            content: '<div class ="label"><span class="left"></span><span class="center">' + categorizedData.EARTHQUAKE[i].name + '</span><span class="right"></span></div>',
            latlng: new kakao.maps.LatLng(categorizedData.EARTHQUAKE[i].longitude, categorizedData.EARTHQUAKE[i].latitude),
            value: "지진/해일 대피시설",
            address: categorizedData.EARTHQUAKE[i].address,
            name: categorizedData.EARTHQUAKE[i].name,
            category: categorizedData.EARTHQUAKE[i].category
        })

    };
    for (var i = 0; i < categorizedData.CIVIL.length; i++) {

        CIVIL.push({
            content: '<div class ="label"><span class="left"></span><span class="center">' + categorizedData.CIVIL[i].name + '</span><span class="right"></span></div>',
            latlng: new kakao.maps.LatLng(categorizedData.CIVIL[i].longitude, categorizedData.CIVIL[i].latitude),
            value: "민방위 대피시설",
            address: categorizedData.CIVIL[i].address,
            name: categorizedData.CIVIL[i].name,
            category: categorizedData.CIVIL[i].category
        })
    };
});
//maker list
var civil_custom = [],
    earthquake_custom = [],
    all_custom = [];


var civil_marker = [],
    earthquake_marker = [],
    all_marker = [];


//지진 마커 생성
$(document).ready(function () {
    for (var i = 0; i < EARTHQUAKE.length; i++) {
        (function (index) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: EARTHQUAKE[index].latlng,
                image: marker_yellow,
                clickable: true
            });

            marker.name = EARTHQUAKE[index].name;
            marker.address = EARTHQUAKE[index].address;
            marker.category = EARTHQUAKE[index].value;

            earthquake_marker.push(marker);
            all_marker.push(marker);

            marker.setMap(map);

            var customOverlay = new kakao.maps.CustomOverlay({
                position: EARTHQUAKE[index].latlng,
                content: EARTHQUAKE[index].content,
                yAnchor: 3.5
            });

            customOverlay.setMap(map);
            earthquake_custom.push(customOverlay);
            all_custom.push(customOverlay);

            kakao.maps.event.addListener(marker, 'click', function () {
                openModal(marker);
            });
        })(i);
    }
});

//민방위 마커 생성
$(document).ready(function () {
    for (var i = 0; i < CIVIL.length; i++) {
        (function (index) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: CIVIL[index].latlng,
                image: marker_red,
                clickable: true
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
                yAnchor: 3.5
            });

            customOverlay.setMap(map);
            civil_custom.push(customOverlay);
            all_custom.push(customOverlay);

            kakao.maps.event.addListener(marker, 'click', function () {
                openModal(marker);
            });
        })(i);
    }
});

/********************카테고리따라 마커 보이기 숨기기******************/

//마커 표시 or 삭제하는 함수
function setMarkers(map, list) {
    for (var i = 0; i < list.length; i++) {
        list[i].setMap(map);
    }
}
$('#all').css('color', 'black');
$('#earth').css('color', 'black');
$('#civil').css('color', 'black');
$('#all').css('color', 'white');
$('#earth').css('color', 'white');
$('#civil').css('color', 'white');
//마커 보이기 함수
function showMarkers(list) {
    setMarkers(map, list)
}
//마커 감추기 함수
function hideMarkers(list) {
    setMarkers(null, list);
}
function earthquake() {
    hideMarkers(civil_marker);
    showMarkers(earthquake_marker);

    hideMarkers(civil_custom);
    showMarkers(earthquake_custom);

    $('#earth').css('color', 'white');

    $('#all').css('color', '#64748b');
    $('#civil').css('color', '#fca5a5');
}
function civil() {
    hideMarkers(earthquake_marker);
    showMarkers(civil_marker);

    hideMarkers(earthquake_custom);
    showMarkers(civil_custom);

    $('#civil').css('color', 'white');

    $('#all').css('color', '#64748b');
    $('#earth').css('color', '#eab308');


}
function go() {
    showMarkers(all_marker);
    showMarkers(all_custom);
    $('#all').css('color', 'white');

    $('#earth').css('color', '#eab308');
    $('#civil').css('color', '#fca5a5');
}

/********************마커 정보창 뜨게 하기******************/
function openModal(marker) {
    // the first inner div
    console.log(marker.name);
    console.log(marker.address);
    console.log(marker.category);

    const div1 = document.getElementById('name');
    div1.innerText = marker.name;
    const div2 = document.getElementById('textArea');
    div2.innerText = marker.address;
    const div3 = document.getElementById('category_btn');
    div3.innerHTML = marker.category;


    const btn = $('#category_btn');
    if (marker.category == "민방위 대피시설") {
        btn.attr('class', 'h-8 bg-red-400 item-center rounded-full text-xs ml-5 px-4 p-2 mb-2 text-white font-bold mt-1');
    }
    else {
        btn.attr('class', 'h-8 bg-yellow-600 item-center rounded-full text-xs ml-5 px-4 p-2 mb-2 text-white font-bold mt-1');
    }



    document.getElementById("modal").style.display = "flex";


}

//현재 좌표로 주소변환해서 추가하기
// function reverseGeocode(lat, lng, callback) {
//     const geocoder = new google.maps.Geocoder();
//     const latLng = { lat: lat, lng: lng };

//     geocoder.geocode({ location: latLng }, function (results, status) {
//         if (status === "OK") {
//             if (results[0]) {
//                 const addressComponents = results[0].address_components;
//                 console.log(addressComponents);

//                 let city = null; // 시/도/광역시 정보를 저장할 변수
//                 let district = null; // 구/군 정보를 저장할 변수
//                 let sub_district = null; // 구/군 정보를 저장할 변수

//                 for (let component of addressComponents) {
//                     if (component.types.includes("administrative_area_level_1")) {
//                         city = component.long_name;
//                         console.log(city);
//                     }
//                     if (
//                         component.types.includes("sublocality_level_1") ||
//                         component.types.includes("locality")
//                     ) {
//                         district = component.long_name;
//                         console.log(district);
//                     }
//                     if (component.types.includes("sublocality_level_2")) {
//                         sub_district = component.long_name;
//                         console.log(sub_district);
//                     }
//                 }

//                 if (city && district && sub_district) {
//                     callback(`${city} ${district} ${sub_district}`);
//                 } else if (city && district) {
//                     callback(`${city} ${district} `);
//                 } else if (city) {
//                     callback(city);
//                 } else {
//                     callback("시/도/광역시 또는 구/군 정보를 찾을 수 없습니다.");
//                 }
//             } else {
//                 callback("결과가 없습니다.");
//             }
//         } else {
//             callback("Geocoder failed due to: " + status);
//         }
//     });
// }

// //현재 접속 좌표 받아와서 주소로 변환하기
// navigator.geolocation.getCurrentPosition(function (position) {
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;

//     reverseGeocode(lat, lon, function (address) {
//         console.log(lat, lon, address);
//         $("#current_city").text(address);
//     });
// });






