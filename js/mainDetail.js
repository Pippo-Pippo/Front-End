const jsonData = {
  "from": "경기도청",
  "category": "RAIN",
  "content": "재난대비용 삐용 사이트를 즉시 방문해주시길 바랍니다.",
  "time": "2023-07-23 오전 02:16",
  "comment": [
    {
      "id": 1,
      "location": "서울특별시 어쩌구 무슨동",
      "name": "강**",
      "content": "삐용 사이트 뭔가요?? 나도 들어갈래~~",
      "createdAt": "2023-07-23 오전 02:18",
      "like": 743,
      "hate": 4,
      "isLike": true,
      "isHate": false,
      "imageUrl": null
    },
    {
      "id": 2,
      "location": "서울특별시 어쩌구 무슨동",
      "name": "김**",
      "content": "저도 들어가보고 싶어요 ^^",
      "createdAt": "2023-07-23 오전 02:22",
      "like": 7,
      "hate": 0,
      "isLike": false,
      "isHate": false,
      "imageUrl": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
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
     <div class="text-start" >
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

 function createCommentBoxHTML(comment, commentNumber) {    return `
 <!--댓글 박스-->
 <div class="flex items-center justify-center text-start">
   <div class="h-28 w-80 mt-2 text-sm text-start">
     <div class="flex items-center justify-start">
       <div class="font-bold">${comment.location}</div>
       <div class="text-grey-600 font-medium text-sm ml-5">${comment.name}</div>
     </div>
     <div class="flex items-start justify-start text-black text-base mt-2 mb-4">
       ${comment.content}
     </div>
     <div class="flex items-center justify-start mb-3">
       <div class="font-medium text-xs mt-1 mr-12">${comment.createdAt}</div>
       <div class="font-light text-xs mt-1  mr-2" id="helpfulCount${commentNumber}">도움돼요 ${comment.like}</div>
       <div class="font-light text-xs mt-1" id="dislikeCount${commentNumber}">싫어요 ${comment.hate}</div>
     </div>
     ${
       comment.imageUrl
         ? `<div id="inputPhoto">
             <img src="${comment.imageUrl}" alt="Comment Image" class="flex items-center justify-center w-72 h-40 border border-gray-400  mt-2 mb-2">
           </div>`
         : ""
     }
     <div class="w-80 h-px bg-gray-400 "></div>
   </div>
   
 </div>
 <!--밑줄-->

`;
}


 displayComment(jsonData);

// 목데이터 연습본
// function loadComment() {
//   return fetch("json/mainDetail.json")
//     .then((response) => response.json())
//     .then((json) => json.comment)
//     .catch((error) => {
//       console.log("실패");
//       console.error(error);
//     });
// }

// loadComment().then((comments) => {
//   displayComment(comments);
// });

// function displayComment(comments) {
//   console.log(comments);
//   const container = document.getElementById("comment");
//   container.innerHTML = comments.map((item) => createHTMLString(item)).join("");
// }

// function createHTMLString(comment) {
//   return `
//   <div class="comment">
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
//           <!-- 도움돼요, 싫어요 버튼 -->
//           <div class="font-light text-xs mt-1 mr-2">도움돼요 ${comment.like}</div>
//           <div class="font-light text-xs mt-1">싫어요 ${comment.hate}</div>
//         </div>
//         ${
//           comment.imageUrl
//             ? `<div id="inputPhoto">
//                <img src="${comment.imageUrl}" alt="Comment Image" class="w-32 h-auto mt-3">
//              </div>`
//             : ""
//         }
//       </div>
//     </div>
//     <div class="w-80 h-px bg-gray-400 my-2 mt-5 ml-4"></div>
//   </div>`;
// }
//Get 댓글 요청
// $(document).ready(function() {
//   loadMainPost();

//   function loadMainPost() {
//     var postId = "postId"; 
//     var url = `https://ppiyong.shop/api/post/${postId}`;

//     $.ajax({
//       type: "GET",
//       url: url,
//       dataType: "json",
//       success: function(responseData) { 
//         var post = responseData;

        
//         $("#postTitle").text(post.from);
//         $("#postCategory").text(post.category);
//         $("#postContent").text(post.content);
//         $("#postTime").text(post.time);

//         var comments = post.comment; 
//         var dataContainer = $("#dataContainer"); 

//         dataContainer.empty();

//         comments.forEach(function(comment) {
//           var commentHtml = `
//           <div class="ml-5 text-start">
//             <div class="bg-white rounded-md shadow-md h-48 w-80 mt-5 p-4 text-lg font-bold text-start">
//               <div class="flex items-center justify-between">
//                 <div>${comment.name}</div>
//                 <div class="text-grey-600 font-medium text-sm ml-4">${comment.createdAt}</div>
//               </div>
//               <div class="flex items-start justify-center text-black font-medium text-base">
//                 ${comment.content}
//               </div>
//               <div class="flex items-start justify-end">
//                 <div class="font-light text-xs mt-1 mr-2">${comment.like} Likes</div>
//                 <div class="font-light text-xs mt-1">${comment.hate} Hates</div>
//               </div>
//               ${
//                 comment.imageUrl
//                   ? `<div id="inputPhoto">
//                      <img src="${comment.imageUrl}" alt="Comment Image" class="w-32 h-auto mt-3">
//                    </div>`
//                   : ""
//               }
//             </div>
//           </div>
//         `;
//           console.log(data);
//           dataContainer.append(commentHtml);
//           alert("데이터 불러오기 성공");
//         });
//       },
//       error: function(xhr, status, error) {
//         if (xhr.status === 204) {
//           console.error("Post not found:", error);
//           alert("포스트 요청 실패");
//         } else if (xhr.status === 403) {
//           console.error("Forbidden - No permission:", error);
//           alert("권한 없는 사용자");
//         } else {
//           console.error("Error fetching post details:", error);
//           alert("서버 요청에 실패.");
//         }
//       }
//     });
//   }
// });