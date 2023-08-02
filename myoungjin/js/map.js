

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
            level: 4 // 지도의 확대 레벨
        };
    
    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition, 
        image: markerImage // 마커이미지 설정 
    });
    
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);  


    
    // 마커 클릭 시 보여줄 정보창의 내용 HTML
var content = '<div style="padding:10px;">마커를 클릭했습니다!</div>';

// 마커를 클릭했을 때 정보창을 생성하고 지도에 표시하는 함수
function showInfoWindow() {
    var infowindow = new kakao.maps.InfoWindow({
        content: content,
        removable: true // 사용자가 정보창을 닫을 수 있도록 설정합니다.
    });

    // 마커를 클릭했을 때 정보창을 지도 위에 표시합니다.
    infowindow.open(map, marker);
}

// 마커를 클릭하면 정보창을 표시하는 이벤트 리스너 등록
kakao.maps.event.addListener(marker, 'click', showInfoWindow);
