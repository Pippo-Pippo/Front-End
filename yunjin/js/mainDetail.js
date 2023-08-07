const jsonData = {
  "from": "윤진시청",
  "category": "RAIN",
  "content": "삐용 사이트 최고!!! 정말 너무 귀엽고 재난 정보도 정확해요 ㅎㅎ 앞으로 삐용 사이트만 사용해야겠어요",
  "time": "2023-07-23 오전 02:16",
  "comment": [
    {
      "location": "서울특별시 어쩌구 무슨동",
      "name": "강**",
      "content": "삐용 사이트 뭔가요?? 저도 들어가보고 싶네요~~",
      "createdAt": "2023-07-23 오전 02:18",
      "like": 10,
      "hate": 4,
      "isLike": true,
      "isHate": false
    },
    {
      "location": "서울특별시 어쩌구 무슨동",
      "name": "김**",
      "content": "저도 들어가보고 싶어요 ^^ 삐용 사이트가 역시 최고죠 ㅎㅎ",
      "createdAt": "2023-07-23 오전 02:22",
      "like": 7,
      "hate": 0,
      "isLike": false,
      "isHate": false
    }
  ]
};

function displayComment(data) {

  const mainContainer = document.getElementById("main");
  mainContainer.innerHTML = createMainBoxHTML(data);


  const commentContainer = document.getElementById("comment");
  commentContainer.innerHTML = data.comment.map((comment, index) =>
    createCommentBoxHTML(comment, index + 1)
  ).join("");
}

function createMainBoxHTML(data) {
  return `
    <!--메인 박스-->
    <div class="ml-5 text-start">
      <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
        <div class="flex items-center justify-between">
          <div>${data.from}</div>
          <div class="text-grey-600 font-medium text-sm ml-4">${data.time}</div>
        </div>
        <button class="w-14 h-7 bg-blue-300 rounded-full mr-1 text-sm font-medium text-white mb-1">
          ${data.category}
        </button>
        <button class="w-14 h-7 bg-gray-600 mt-1 rounded-full text-sm font-medium text-white mb-1">
          ${data.category}
        </button>
        <div class="flex items-start justify-center text-black font-medium text-base">
          ${data.content}
        </div>
      </div>
    </div>
  `;
}

function createCommentBoxHTML(comment, commentNumber) {
  return `
    <!--댓글 박스-->
    <div class="flex items-center justify-center text-start">
      <div class="h-28 w-80 mt-2 p-3 text-sm text-start">
        <div class="flex items-center justify-start">
          <div class="font-bold">${comment.location}</div>
          <div class="text-grey-600 font-medium text-sm ml-5">${comment.name}</div>
        </div>
        <div class="flex items-start justify-center text-black text-base mt-2">
          ${comment.content}
        </div>
        <div class="flex items-center justify-start">
          <div class="font-medium text-xs mt-1 mr-12">${comment.createdAt}</div>
          <div class="font-light text-xs mt-1 mr-2" id="helpfulCount${commentNumber}">도움돼요 ${comment.like}</div>
          <div class="font-light text-xs mt-1" id="dislikeCount${commentNumber}">싫어요 ${comment.hate}</div>
        </div>
      </div>
    </div>
    <!--밑줄-->
    <div class="w-80 h-px bg-gray-400 my-2 mt-5 ml-4"></div>
  `;
}


displayComment(jsonData);

//function loadComment() {
  //return fetch("json/mainDetail.json")
    //.then((response) => response.json())
    //.then((json) => json.comment)
    //.catch((error) => {
     // console.log("실패");
     // console.error(error);
   // });
//}

//loadComment().then((comment) => {
  //displayComment(comment);
//});

//function displayComment(comments) {
  //console.log(comments);
  //const container = document.getElementById("comment");
  //container.innerHTML = comments.map((item) => createHTMLString(item)).join("");
  
//}

//function createHTMLString(comment) {
  
  //return `
 // <div class = "comment">
 // <div class="flex items-center justify-center text-start">
      //<div class="h-28 w-80 mt-2 p-3 text-sm text-start">
        //<div class="flex items-center justify-start">
         // <div class="font-bold">${comment.location}</div>
          //<div class="text-grey-600 font-medium text-sm ml-5">${comment.name}</div>
       // </div>
        //<div class="flex items-start justify-center text-black text-base mt-2">
       // ${comment.content}
       // </div>
       // <div class="flex items-center justify-start">
          //<div class="font-medium text-xs mt-1 mr-12">${comment.createdAt}</div>
         // <!--도움돼요, 싫어요 버튼-->
         // <div class="font-light text-xs mt-1 mr-2">도움돼요 ${comment.like}</div>
       // <div class="font-light text-xs mt-1">싫어요 ${comment.hate}</div>
       // </div>
       // </div>
      //  </div>
       // <div class="w-80 h-px bg-gray-400 my-2 mt-5 ml-4"></div>
     //</div>`;
 
//}
