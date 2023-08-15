$(document).ready(function () {
    // 초기 상태 설정
    var selectedButtons = [];

    // 페이지 로드 시 JSON 데이터 가져오기
    // $.getJSON('/json/category.json', function (data) {
    //     $.each(data, function (key, value) {
    //         console.log(data);
    //         if (value == 1) {
    //             selectedButtons.push(key);
    //             $('#' + key).addClass('active');
    //         }
    //     });
    // });
    $.ajax({
        type: 'GET',
        url:`https://ppiyong.shop/api/notification/category`,
        xhrFields: {
            withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
          },
        success: function(data) {
            $.each(data, function (key, value) {
                console.log(data);
                if (value == 1) {
                    selectedButtons.push(key);
                    $('#' + key).addClass('active');
                }
            });
        },
        error: function(error) {
            console.error("GET 요청 실패:", error);
        }
    });

    // 버튼 클릭 이벤트
    $('.category_btn').click(function () {
        var buttonId = this.id;

        if (selectedButtons.includes(buttonId)) {
            selectedButtons = selectedButtons.filter(function (id) {
                return id !== buttonId;
            });
            $('#' + buttonId).removeClass('active');
        } else {
            if (selectedButtons.length < 2) {
                selectedButtons.push(buttonId);
                $('#' + buttonId).addClass('active');
                
            }
        }
    });

    // Send 버튼 클릭 이벤트
    $('#sendButton').click(function () {
        if (selectedButtons.length === 0) {
            alert("한개 이상 선택해주세요.");
            return;
        }

        var dataToSend = {
            "weather": selectedButtons.includes("weather") ? 1 : 0,
            "earthquake": selectedButtons.includes("earthquake") ? 1 : 0,
            "civil": selectedButtons.includes("civil") ? 1 : 0,
            "lost": selectedButtons.includes("lost") ? 1 : 0
        };
        $.each(dataToSend, function (key, value) {
            key=value;
            //ex) weather 값에 1 넣은것 
            
        });
        console.log(dataToSend);
        // AJAX PUT 요청 보내기
        $.ajax({
            type: 'PUT',
            url: `https://ppiyong.shop/api/notification/category?weather=${weather}&earthquake=${earthquake}&civil=${civil}&lost=${lost}`, // PUT 요청을 보낼 API의 엔드포인트 URL
            data: JSON.stringify(dataToSend),
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
              },
            success: function (response) {
                console.log("PUT 요청 성공:", response);
                location.href='/alarm/alarm.html';

            },
            error: function (error) {
                console.error("PUT 요청 실패:", error);
            }
        });
    });
});