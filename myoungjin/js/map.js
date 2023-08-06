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


var imageRed = '../img/red_marker.svg', // 마커이미지의 주소입니다
    imageYellow = '../img/yellow_marker.svg',
    imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

//목업데이터 불러오기
$.getJSON("../json/map.json", function (data) {
    $.each(data, function (index, item) {
        var name = item.name,
            category = item.category,
            lat = item.latitude,
            long = item.longtitude,
            address = item.address;
        if (category == "EARTHQUAKE") {
            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageRed, imageSize, imageOption);
        }     
        else
        {
            var markerImage = new kakao.maps.MarkerImage(imageYellow, imageSize, imageOption);

        }
        var markerPosition = new kakao.maps.LatLng(long, lat); // 마커가 표시될 위치입니다 //경도, 위도
        
        // 마커를 생성합니다
        marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage // 마커이미지 설정 
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);


    });
});
// document.getElementById("modal").style.display="none";




var iwContent = '<div style="padding:5px;">보람아파트 지하주차장 대피소</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable
});

// 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener(marker, 'click', function() {
    // 마커 위에 인포윈도우를 표시합니다
    infowindow.open(map, marker);
});
// $('.js-click-modal').click(function(){
//     $('#modal').addClass('modal-open');
//   });
kakao.maps.event.addListener(marker, 'click', function () {
    $('#modal').addClass('modal-open');
    document.getElementById("modal").style.display = "flex";
});


