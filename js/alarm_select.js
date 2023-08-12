var select_regionList=[];
var select_categoryList=[];


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
    //     url: "https://page.ppiyong.shop/api/notification/region",
    //     data: JSON.stringify({
    //         "region":region
    //     }),
    //     contentType: "application/json",
    //     dataType: "json", 
    //     success: function(response) {
    //         console.log("전송성공");
    //     },
    //     error: function(request, status, error) {
    //         console.error(request,status, error);
    //    
    //     }
    // });


}
    


