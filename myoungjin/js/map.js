$("#modal").hide();
var civilList = [],
    earthquakeList = [],
    allList = [];
var marker;

//지도 생성
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.56645, 126.97796), // 지도의 중심좌표 내 현위치로 바꾸기
        level: 4 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

//현재위치 생성
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

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition) {
    var image = '../img/location.svg';
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

//마커 생성
var imageRed = '../img/red_marker.svg', // 마커이미지의 주소입니다
    imageYellow = '../img/yellow_marker.svg',
    imageSize = new kakao.maps.Size(40,50), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

//목업데이터 불러오기
$.getJSON("../json/map.json", function (data) {
    $.each(data, function (index, item) {
        var name = item.name,
            category = item.category,
            lat = item.latitude,
            long = item.longitude,
            address = item.address;
        var value = "구분";
        if (category == "EARTHQUAKE") {
            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageYellow, imageSize, imageOption);
            value = "지진/해일 대피시설";
        }
        else {
            var markerImage = new kakao.maps.MarkerImage(imageRed, imageSize, imageOption);
            value = "민방위 대피시설";

        }
        var markerPosition = new kakao.maps.LatLng(long, lat); // 마커가 표시될 위치입니다 //경도, 위도

        // 마커를 생성합니다
        marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage // 마커이미지 설정 
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
        var content = '<div class ="label"><span class="left"></span><span class="center">' + name + '</span><span class="right"></span></div>'

        // 커스텀 오버레이가 표시될 위치입니다 
        var position = new kakao.maps.LatLng(long, lat);

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content,
            yAnchor: 3.5
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);

        kakao.maps.event.addListener(marker, 'click', function () {
            const mainDiv = $(".content");
            // Create the first inner div
            const div1 = document.createElement('div');
            div1.textContent = name;
            mainDiv.append(div1);

            // Create the second inner div with button
            const div2 = document.createElement('div');
            const button = document.createElement('button');
            if (category == "EARTHQUAKE") {
                button.className = 'h-8 bg-yellow-400 item-center rounded-full text-xs ml-5 px-4 p-2 text-white font-bold';
            }
            else {
                button.className = 'h-8 bg-red-400 item-center rounded-full text-xs ml-5 px-4 p-2 text-white font-bold';
            }
            button.textContent = value;
            div2.appendChild(button);

            mainDiv.append(div2);

            // Create the third inner div with span and button
            const div3 = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = address;
            const copyButton = document.createElement('button');
            copyButton.textContent = '복사';
            copyButton.className='ml-2 rounded bg-gray-600 text-white';
            copyButton.setAttribute('onclick', 'copy()');
            div3.append(span);
            div3.append(copyButton);

            mainDiv.append(div3);

            document.getElementById("modal").style.display = "flex";



        });

    });
});

/************************ 백엔드 통신 ***************************/
// $.ajax({
//     type: "GET",
//     url: `http://page.ppiyong.shop/api/shelter`,
//     contentType: "application/json",
//     success: function (data) {
//         $.each(data, function (index, item) {
//             var name = item.name,
//                 category = item.category,
//                 lat = item.latitude,
//                 long = item.longitude,
//                 address = item.address;
//             var value = "구분";
//             if (category == "EARTHQUAKE") {
//                 // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
//                 var markerImage = new kakao.maps.MarkerImage(imageRed, imageSize, imageOption);
//                 value = "지진/해일 대피시설";
//             }
//             else {
//                 imageSize = new kakao.maps.Size(36, 40);
//                 var markerImage = new kakao.maps.MarkerImage(imageYellow, imageSize, imageOption);
//                 value = "민방위 대피시설";

//             }
//             var markerPosition = new kakao.maps.LatLng(long, lat); // 마커가 표시될 위치입니다 //경도, 위도

//             // 마커를 생성합니다
//             marker = new kakao.maps.Marker({
//                 position: markerPosition,
//                 image: markerImage // 마커이미지 설정 
//             });

//             // 마커가 지도 위에 표시되도록 설정합니다
//             marker.setMap(map);
//             var content = '<div class ="label"><span class="left"></span><span class="center">' + name + '</span><span class="right"></span></div>'

//             // 커스텀 오버레이가 표시될 위치입니다 
//             var position = new kakao.maps.LatLng(long, lat);

//             // 커스텀 오버레이를 생성합니다
//             var customOverlay = new kakao.maps.CustomOverlay({
//                 position: position,
//                 content: content,
//                 yAnchor: 3.5
//             });

//             // 커스텀 오버레이를 지도에 표시합니다
//             customOverlay.setMap(map);

//             kakao.maps.event.addListener(marker, 'click', function () {
//                 const mainDiv = $(".content");
//                 // Create the first inner div
//                 const div1 = document.createElement('div');
//                 div1.textContent = name;
//                 mainDiv.append(div1);

//                 // Create the second inner div with button
//                 const div2 = document.createElement('div');
//                 const button = document.createElement('button');
//                 if (category == "EARTHQUAKE") {
//                     button.className = 'h-8 bg-yellow-400 item-center rounded-full text-xs ml-5 px-4 p-2 text-white font-bold';
//                 }
//                 else {
//                     button.className = 'h-8 bg-red-400 item-center rounded-full text-xs ml-5 px-4 p-2 text-white font-bold';
//                 }
//                 button.textContent = value;
//                 div2.appendChild(button);

//                 mainDiv.append(div2);

//                 // Create the third inner div with span and button
//                 const div3 = document.createElement('div');
//                 const span = document.createElement('span');
//                 span.textContent = address;
//                 const copyButton = document.createElement('button');
//                 copyButton.textContent = '복사';
//                 copyButton.setAttribute('onclick', 'copy()');
//                 div3.append(span);
//                 div3.append(copyButton);

//                 mainDiv.append(div3);

//                 document.getElementById("modal").style.display = "flex";

//             });

//         });

//     },
//     error: function (request, status, error) {
//         alert(message);
//     },
// });

function copy() {
    var copyText = "텍스트";
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("Copy");
}




