// const jsonData = {
//   "from": "윤진시청",
//   "category": "RAIN",
//   "content": "재난대비용 삐용 사이트를 즉시 방문해주시길 바랍니다. 심지어 귀엽고 예뻐요",
//   "time": "2023-07-23 오전 02:16",
//   "comment": [
//     {
//       "location": "서울특별시 어쩌구 무슨동",
//       "name": "강**",
//       "content": "삐용 사이트 뭔가요?? 저도 들어가보고 싶네요~~",
//       "createdAt": "2023-07-23 오전 02:18",
//       "like": 10,
//       "hate": 4,
//       "isLike": true,
//       "isHate": false
//     },
//     {
//       "location": "서울특별시 어쩌구 무슨동",
//       "name": "김**",
//       "content": "저도 들어가보고 싶어요 ^^ 삐용 사이트가 역시 최고죠 ㅎㅎ",
//       "createdAt": "2023-07-23 오전 02:22",
//       "like": 7,
//       "hate": 0,
//       "isLike": false,
//       "isHate": false
//     }
//   ]
// };

// function displayComment(data) {

//   const mainContainer = document.getElementById("main");
//   mainContainer.innerHTML = createMainBoxHTML(data);


//   const commentContainer = document.getElementById("comment");
//   commentContainer.innerHTML = data.comment.map((comment, index) =>
//     createCommentBoxHTML(comment, index + 1)
//   ).join("");
// }

// function createMainBoxHTML(data) {
//   return `
//     <!--메인 박스-->
//     <div class="ml-5 text-start">
//       <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
//         <div class="flex items-center justify-between">
//           <div>${data.from}</div>
//           <div class="text-grey-600 font-medium text-sm ml-4">${data.time}</div>
//         </div>
//         <button class="w-14 h-7 bg-blue-300 rounded-full mr-1 text-sm font-medium text-white mb-1">
//           ${data.category}
//         </button>
//         <button class="w-14 h-7 bg-gray-600 mt-1 rounded-full text-sm font-medium text-white mb-1">
//           ${data.category}
//         </button>
//         <div class="flex items-start justify-center text-black font-medium text-base">
//           ${data.content}
//         </div>
//       </div>
//     </div>
//   `;
// }

// function createCommentBoxHTML(comment, commentNumber) {
//   return `
//     <!--댓글 박스-->
//     <div class="flex items-center justify-center text-start">
//       <div class="h-28 w-80 mt-2 p-3 text-sm text-start">
//         <div class="flex items-center justify-start">
//           <div class="font-bold">${comment.location}</div>
//           <div class="text-grey-600 font-medium text-sm ml-5">${comment.name}</div>
//         </div>
//         <div class="flex items-start justify-center text-black text-base mt-2">
//           ${comment.content}
//         </div>
//         <div class="flex items-center justify-start">
//           <div class="font-medium text-xs mt-1 mr-12">${comment.createdAt}</div>
//           <div class="font-light text-xs mt-1 mr-2" id="helpfulCount${commentNumber}">도움돼요 ${comment.like}</div>
//           <div class="font-light text-xs mt-1" id="dislikeCount${commentNumber}">싫어요 ${comment.hate}</div>
//         </div>
//       </div>
//     </div>
//     <!--밑줄-->
//     <div class="w-80 h-px bg-gray-400 my-2 mt-5 ml-4"></div>
//   `;
// }


// displayComment(jsonData);

//목데이터 연습본
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

$(document).ready(function() {
  $("#verifyButton").click(function() {
      var commentContent = $("#verificationCode").val(); // 입력된 댓글 내용
      var imageSrc = $("#inputPhoto img").attr("src"); // 이미지의 소스
      
      // 새 댓글 엘리먼트 생성
      var newComment = $("<div>").addClass("flex items-center justify-center text-start");
      var newCommentBox = $("<div>").addClass("h-48 w-80 p-3 text-sm text-start").css("margin-left", "-34px");
      
      // 댓글 내용 추가
      var commentHeader = $("<div>").addClass("flex items-center justify-start");
      var commentLocation = $("<div>").addClass("font-bold").text("삼산구 삼산 2동");
      var commentAuthor = $("<div>").addClass("text-grey-600 font-medium text-sm ml-5").text("강**");
      commentHeader.append(commentLocation, commentAuthor);
      newCommentBox.append(commentHeader);
      
      // 댓글 내용 추가 (수정된 부분)
      var commentText = $("<div>").addClass("flex items-start justify-center text-black text-base mt-2").text(commentContent);
      newCommentBox.append(commentText);
      
      // 이미지 추가
      var commentImage = $("<div>").addClass("flex items-center justify-center w-78 h-20 border border-gray-400 mb-1 mt-2").text("사진");
      if (imageSrc) {
          var commentImagePreview = $("<img>").addClass("w-78 h-20 object-cover").attr("src", imageSrc);
          commentImage.empty().append(commentImagePreview);
      }
      newCommentBox.append(commentImage);
      
      // 시간 및 좋아요/싫어요 카운트 추가
      var commentTime = $("<div>").addClass("flex items-center justify-start");
      var commentTimeText = $("<div>").addClass("font-medium text-xs mt-1 ml-5 mr-11").text(getCurrentTime());
      var helpfulCount = $("<div>").addClass("font-light text-xs mt-1 mr-2").text("좋아요 0").attr("id", "helpfulCount1");
      var dislikeCount = $("<div>").addClass("font-light text-xs mt-1").text("싫어요 0").attr("id", "dislikeCount1");
      commentTime.append(commentTimeText, helpfulCount, dislikeCount);
      newCommentBox.append(commentTime);
      
      // 댓글 박스에 내용 추가
      newComment.append(newCommentBox);
      
      // 댓글을 추가하는 부분을 원하는 위치에 추가하면 됩니다.
      $("#comment").append(newComment);
      
      // 입력된 댓글 내용을 지웁니다.
      $("#verificationCode").val("");
      
      // 추가된 댓글 박스 아래에 구분선 추가
      var separatingLine = $("<div>").addClass("flex items-center justify-center w-80 h-px bg-gray-400 my-2 mt-3");
      $("#comment").append(separatingLine);
  });
});

// 현재 시간을 가져오는 함수
function getCurrentTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = String(now.getMonth() + 1).padStart(2, "0");
  var day = String(now.getDate()).padStart(2, "0");
  var hour = String(now.getHours()).padStart(2, "0");
  var minute = String(now.getMinutes()).padStart(2, "0");
  var second = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
