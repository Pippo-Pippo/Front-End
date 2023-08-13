var select_region = null;
var select_regionBtn = null;
var before_select = "";
//알림 지역 조회
//목데이터 ver
// $(document).ready(function () {
//     $.getJSON("../json/user_region.json", function (data) {
//         console.log(data);
//         var region = data.region;

//         console.log("GET 요청 성공, region 값:", region);
//         before_select = '#' + region;
//         $(before_select).css({ 'background-color': '#FDE047' });
//         $(before_select).css({ 'font-weight': '700' });
//     });
//     $('.region_btn').click(function () {
//         $(before_select).css({ 'background-color': '#F4f4f5' });
//         $(before_select).css({ 'font-weight': '400' });
//     });
// });
//ajax ver
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'http://page.ppiyong.shop/api/notification/region',
        contentType: "application/json",
        success: function (data) {
            // 요청이 성공하면 여기서 처리
            var region = data.region;

            console.log("GET 요청 성공, region 값:", region);
            before_select = '#' + region;
            $(before_select).css({ 'background-color': '#FDE047' });
            $(before_select).css({ 'font-weight': '700' });
        },
        error: function (error) {
            // 요청이 실패하면 여기서 처리
            console.error("GET 요청 실패:", error);
        }
    });
    $('.region_btn').click(function () {
        $(before_select).css({ 'background-color': '#F4f4f5' });
        $(before_select).css({ 'font-weight': '400' });
    });
});

//카테고리 조회
// $(document).ready(function () {
//     $.getJSON("../json/category.json", function (data) {
//         console.log(data);
        

//         console.log("GET 요청 성공, region 값:", region);
//         before_select = '#' + region;
//         $(before_select).css({ 'background-color': '#FDE047' });
//         $(before_select).css({ 'font-weight': '700' });
//     });
//     $('.region_btn').click(function () {
//         $(before_select).css({ 'background-color': '#F4f4f5' });
//         $(before_select).css({ 'font-weight': '400' });
//     });
// });
// $.ajax({
//     type: 'GET',
//     url: 'http://page.ppiyong.shop/api/notification/category',
//     contentType: "application/json",
//     success: function(data) {
//         // 요청이 성공하면 여기서 처리


//         console.log("GET 요청 성공, category 값:", data);
//         select_regionBtn = $('#'+region);
//     },
//     error: function(error) {
//         // 요청이 실패하면 여기서 처리
//         console.error("GET 요청 실패:", error);
//     }
// });
//지역 선택하기
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

        showData();
    }
});

//지역 보내기
console.log(select_region);
console.log(select_regionBtn);
$("#next_btn").on('click', function () {
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
            if (select_region == null) {
                alert("지역을 하나 선택 하십시오");
            }
            else {
                location.href = '/alarm/select_category.html';
            }
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
select_categoryList = [];

function select_category(click_id) {
    //지역선택
    click_btn = document.getElementById(click_id);
    console.log(click_id);
    select_categoryList.push(click_id);
    console.log(select_categoryList);
    click_btn.style.backgroundColor = "#FDE047";
    click_btn.style.fontWeight = "700"
}

//카테고리 보내기
// function put() {
//     $.ajax({
//         type: "PUT",
//         url: `http://page.ppiyong.shop/api/notification/region`,
//         contentType: "application/json",
//         data: JSON.stringify(
//             {
                
//                     "weather":1,
//                     "earthquake":0,
//                     "civil":0,
//                     "lost":1
                
//             }
//         ),
//         success: function (data) {
//             console.log("전송 성공")
//             if (select_region == null) {
//                 alert("지역을 하나 선택 하십시오");
//             }
//             else {
//                 location.href = '/alarm/select_category.html';
//             }
//         },
//         error: function (request, status, error) {
//             console.log(
//                 "code:" +
//                 request.status +
//                 "\n" +
//                 "message:" +
//                 request.responseText +
//                 "\n" +
//                 "error:" +
//                 error
//             );
//         },
//     });
// }



