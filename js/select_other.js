
$(document).ready(function () {
    var selectedButton = null; // 한 개의 선택된 버튼만을 추적하는 변수

    // 버튼 클릭 이벤트
    $('.region_btn').click(function () {
        var buttonId = this.id;

        // 선택된 버튼이 이미 있는 경우
        if (selectedButton === buttonId) {
            $('#' + buttonId).removeClass('active');
            selectedButton = null;
        } else {
            // 선택된 버튼이 없는 경우
            if (selectedButton === null) {
                // 이전에 선택된 버튼이 있으면 선택 상태를 제거합니다.
                if (selectedButton !== null) {
                    $('#' + selectedButton).removeClass('active');
                }

                $('#' + buttonId).addClass('active');
                selectedButton = buttonId;

                // 토스트 메시지와 로컬 스토리지 업데이트 로직 추가
                $('#toastMsg').show();
                setTimeout(function () {
                    $('#toastMsg').hide();
                    window.location.href = "https://page.ppiyong.shop/main.html";

                }, 3000);

                var dataToSend = {
                    "region": selectedButton
                };
                
                var region_kr=$('#'+selectedButton).text();
                console.log(dataToSend);
                console.log(selectedButton);
                console.log(region_kr);


                // 선택된 버튼 값으로 로컬 스토리지 값을 수정합니다.
                localStorage.setItem('select_region', region_kr);
            }
        }
    });
}); 


