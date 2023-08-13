var select_region = null;
var select_regionBtn = null;

$.getJSON("../json/regionList.json", function (data) {

    const length = data.regionList.length;
    var i;
    for (i = 0; i < length; i++) {

        const showData = () => {

            const value = data.regionList[i].value;
            const buttonElement = document.createElement('button');
            buttonElement.setAttribute('id', value);
            buttonElement.setAttribute('class', 'region_btn');
            buttonElement.textContent = value;

            const divElement = document.createElement('div');
            divElement.appendChild(buttonElement);

            $('#countryBox').append(divElement);

        }
        showData();

        $(".region_btn").on('click', function (e) {
            // select_regionBtn = $('#' + e.target.id)
            //해제가 안 되네 ...
            if (select_regionBtn == $(e.target)) {
                $(e.target).css({ 'background-color': '#F4f4f5' });
                $(e.target).css({ 'font-weight': '400' });
                select_region = null;
            }
            //한개만 선택
            if (!select_regionBtn || select_regionBtn !== $(e.target)) {

                // 클릭된 마커 객체가 null이 아니면
                // 클릭된 마커의 이미지를 기본 이미지로 변경하고
                !!select_regionBtn && select_regionBtn.css({ 'background-color': '#F4f4f5' });
                !!select_regionBtn && select_regionBtn.css({ 'font-weight': '400' });

                // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
                $(e.target).css({ 'background-color': '#FDE047' });
                $(e.target).css({ 'font-weight': '700' });
            }
            select_regionBtn = $(e.target);
            // select_regionBtn = $('#' + e.target.id)
            select_region = e.target.id;
            //$(e.target)=marker라 생각
            console.log(select_region = e.target.id);
            // select_regionBtn.on('click', function (e) {
            //     $(e.target).css({ 'background-color': '#F4f4f5' });
            //     $(e.target).css({ 'font-weight': '400' });
            //     select_region=null;
            // });
            //제주도는 선택 X 왜 ??????????????????????????????????????????????????????////


        });

    }
});
$(document).ready(function () {
    $('.region_btn').click(function () {
        $.ajax({
            type: "PUT",
            url: `http://page.ppiyong.shop/api/notification/region`,
            contentType: "application/json",
            data: JSON.stringify(
                {
                    "region": select_region
                }
            ),
            success: function (data) {
                console.log("전송 성공")
                $('#toastMsg').show();
                //3초뒤 메세지창 사라짐
                setTimeout(function () {
                    $('#toastMsg').hide();
                }, 3000);
            },
            error: function (request, status, error) {
                console.log(
                    "code:" +
                    request.status +
                    "\n" +
                    "message:" +
                    request.responseText +
                    "\n" +
                    "error:" +
                    error
                );
            },
        });
    });
});


