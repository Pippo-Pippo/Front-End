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
    //     success: function(data) {
    //         selectedButtons.push(data.region);
    //         $('#'+data.region).addClass('active');
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
        
        //1개 선택하면 토스트창 뜨게 하기
        if (selectedButtons.length === 1) {
            $('#toastMsg').show();
                //3초뒤 메세지창 사라짐
                setTimeout(function () {
                    $('#toastMsg').hide();
                }, 3000);
            var dataToSend = {
                    "region":selectedButtons[0]
            };
            // AJAX PUT 요청 보내기
            $.ajax({
                type: 'PUT',
                url: 'https://ppiyong.shop/api/notification/region', // PUT 요청을 보낼 API의 엔드포인트 URL
                data: JSON.stringify(dataToSend),
                contentType: 'application/json',
                success: function (response) {
                    console.log("PUT 요청 성공:", response);
                },
                error: function (error) {
                    console.error("PUT 요청 실패:", error);
                }
            });
            return;
        }

        
        
        
    });

    

        

});



