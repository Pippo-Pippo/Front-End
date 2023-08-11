var select_regionList = [];
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

function reset(){
    select_regionList=[];
    click_btn.style.backgroundColor = "#F4F4F5";
    click_btn.style.fontWeight = "400";


}
function select_region(click_id) {
        if(select_regionList==0){
        click_btn = document.getElementById(click_id);
        console.log(click_id);
        select_regionList.push(click_id);
        console.log(select_regionList);
        click_btn.style.backgroundColor = "#FDE047";
        click_btn.style.fontWeight = "700";
        $('#toastMsg').show();
        }
        else if(select_regionList>2){
        reset(click_id);
        }

    //선택한 값 보내주기 

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

//두번누르면 취소되는 기능 ??


