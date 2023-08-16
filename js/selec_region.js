$(document).ready(function () {
    // 초기 상태 설정
    var selectedButtons=[];

    // 페이지 로드 시 JSON 데이터 가져오기
    $.getJSON('/json/user_region.json', function (data) {

        selectedButtons.push(data.region);
        $('#'+data.region).addClass('active');
        
    });
    // $.ajax({
    //     type: 'GET',
    //     url:`https://ppiyong.shop/api/notification/region`,
    //     xhrFields: {
    //         withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
    //     },
    //     contentType: "application/json",
    //     success: function(data) {
    //         selectedButtons.push(data.region);
    //         $('#'+data.region).addClass('active');
    //         console.log(data.region);
    //     },
    //     error: function(error) {
    //         console.error("GET 요청 실패:", error);
    //     }
    // });

    // 버튼 클릭 이벤트
    $('.region_btn').click(function () {
        var buttonId = this.id;
        console.log(buttonId);
        if (selectedButtons.includes(buttonId)) {
            selectedButtons = selectedButtons.filter(function (id) {
                return id !== buttonId;
            });
            $('#' + buttonId).removeClass('active');
        } else {
            if (selectedButtons.length < 1) {
                selectedButtons.push(buttonId);
                $('#' + buttonId).addClass('active');
            }
        }
    });

    // Send 버튼 클릭 이벤트
    $('#sendButton').click(function () {
        if (selectedButtons.length === 0) {
            alert("지역을 선택해주세요.");
            return;
        }

        var dataToSend = {
            "region":selectedButtons[0]
        };
        console.log(dataToSend);
        // AJAX PUT 요청 보내기
        $.ajax({
            type: 'PUT',
            url: `https://ppiyong.shop/api/notification/region`, // PUT 요청을 보낼 API의 엔드포인트 URL
            contentType: "application/json",
            data: JSON.stringify(dataToSend),
            xhrFields: {
                withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
              },
            success: function (response) {
                console.log("PUT 요청 성공:", response);
                location.href='/alarm/select_category.html';

            },
            error: function (error) {
                console.error("PUT 요청 실패:", error);
            }
        });
    });
});



