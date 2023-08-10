var select_regionList=[];
var select_categoryList=[];

$.getJSON("../json/regionList.json", function (data) {

    const length = data.regionList.length;
    var i;
    for (i = 0; i < length; i++) {

        const showData = () => {

            const region = data.regionList[i].region;
            const value = data.regionList[i].value;
            const buttonElement = document.createElement('button');
            buttonElement.setAttribute('onclick', 'select_region(this.id)');
            buttonElement.setAttribute('id', region);
            buttonElement.textContent = value;

            const divElement = document.createElement('div');
            divElement.appendChild(buttonElement);

            $('#countryBox').append(divElement);

        }
        showData();
    }
});

//클릭한 지역 리스트에 담는 함수
function select_region(click_id) {
        //지역선택
        click_btn = document.getElementById(click_id);
        console.log(click_id);
        select_regionList.push(click_id);
        console.log(select_regionList);
        click_btn.style.backgroundColor = "#FDE047";
        click_btn.style.fontWeight = "700"
}
function select_category(click_id) {
    //지역선택
    click_btn = document.getElementById(click_id);
    console.log(click_id);
    select_categoryList.push(click_id);
    console.log(select_categoryList);
    click_btn.style.backgroundColor = "#FDE047";
    click_btn.style.fontWeight = "700"
}


//선택한 지역, 카테고리 보내는 함수
function put(){
    select_regionList=[];
    select_categoryList=[];
    document.getElementsByClassName("category_btn").style.backgroundColor="#F4F4F5";
    document.getElementsByClassName("category_btn").style.fontWeight="400";
        // $.ajax({
    //     type: "PUT",
    //     url: `http://page.ppiyong.shop/api/notification/region`,
    //     contentType: "application/json",
    //     success: function (data) {
    //         console.log("전송 성공")
    //     },
    //     error: function (request, status, error) {
    //         alert(
    //             "code:" +
    //             request.status +
    //             "\n" +
    //             "message:" +
    //             request.responseText +
    //             "\n" +
    //             "error:" +
    //             error
    //         );
    //     },
    // });


}
    


