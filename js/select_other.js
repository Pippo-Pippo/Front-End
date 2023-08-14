$(document).ready(function () {
    var selectedButtons = [];

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
                //1개 선택하면 토스트창 뜨게 하기
                if (selectedButtons.length === 1) {
                    $('#toastMsg').show();
                    //3초뒤 메세지창 사라짐
                    setTimeout(function () {
                        $('#toastMsg').hide();
                    }, 3000);
                    var dataToSend = {
                        "region": selectedButtons[0]
                    };
                    console.log(selectedButtons[0]);
                    //홈에서 로컬스토리지에 저장시킨 convertedAddress값을 선택 버튼 값으로 수정시키면 될듯 ..?
                    var value = localStorage.getItem('convertedAddress');

                    // 가져온 값을 수정합니다.
                    if (value !== null) {
                        var newValue = selectedButtons[0];

                        // 수정된 값을 다시 localStorage에 저장합니다.
                        localStorage.setItem('convertedAddress', newValue);
                    } else {
                        console.log('해당 키에 저장된 값이 없습니다.');
                    }
                    return;
                }
            }
        }
    });
});



