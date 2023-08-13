//현재 좌표로 주소변환해서 추가하기
function reverseGeocode(lat, lng, callback) {
  const geocoder = new google.maps.Geocoder();
  const latLng = { lat: lat, lng: lng };

  geocoder.geocode({ location: latLng }, function (results, status) {
    if (status === "OK") {
      if (results[0]) {
        const addressComponents = results[0].address_components;
        console.log(addressComponents);

        let city = null; // 시/도/광역시 정보를 저장할 변수
        let district = null; // 구/군 정보를 저장할 변수
        let sub_district = null; // 구/군 정보를 저장할 변수

        for (let component of addressComponents) {
          if (component.types.includes("administrative_area_level_1")) {
            city = component.long_name;
            console.log(city);
          }
          if (
            component.types.includes("sublocality_level_1") ||
            component.types.includes("locality")
          ) {
            district = component.long_name;
            console.log(district);
          }
          if (component.types.includes("sublocality_level_2")) {
            sub_district = component.long_name;
            console.log(sub_district);
          }
        }

        if (city && district && sub_district) {
          callback(`${city} ${district} ${sub_district}`);
        } else if (city && district) {
          callback(`${city} ${district} `);
        } else if (city) {
          callback(city);
        } else {
          callback("시/도/광역시 또는 구/군 정보를 찾을 수 없습니다.");
        }
      } else {
        callback("결과가 없습니다.");
      }
    } else {
      callback("Geocoder failed due to: " + status);
    }
  });
}

//현재 접속 좌표 받아와서 주소로 변환하기
navigator.geolocation.getCurrentPosition(function (position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  reverseGeocode(lat, lon, function (address) {
    console.log(lat, lon, address);
    $("#current_city").text(address);
  });
});
document.querySelector("#commentImageUpload").addEventListener('click', () => {
  let selectFile = document.querySelector("#imageUpload").files[0];

  if (selectFile) {
    const file = URL.createObjectURL(selectFile);
    document.querySelector("#commentImageContainer").classList.remove("hidden");
    document.querySelector("#commentImage").src = file;
  }
});

document.querySelector("#verifyButton").addEventListener('click', () => {
  let selectFile = document.querySelector("#imageUpload").files[0];

  if (selectFile) {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
        const imageUrl = e.target.result;

        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.style.maxWidth = "100%";
        imageElement.style.height = "100%";

        imagePreviewDiv.innerHTML = "";

        imagePreviewDiv.appendChild(imageElement);
    };

    fileReader.readAsDataURL(selectFile);
}
});
document.getElementById("fileSelectButton").addEventListener("click", function() {
  document.getElementById("commentImageUpload").click();
});

// Add an event listener to the file input to handle the selected file
document.getElementById("commentImageUpload").addEventListener("change", function(event) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      const commentImage = document.createElement("img");
      commentImage.src = imageUrl;
      commentImage.className = "flex items-center justify-center w-72 h-40 border border-gray-400 mt-2 mb-2";
      commentImage.alt = "Comment Image";
      document.getElementById("inputPhoto").innerHTML = "";
      document.getElementById("inputPhoto").appendChild(commentImage);
      
  }
  else {
    // Remove the photo div if no image is selected
    document.getElementById("inputPhoto").innerHTML = "none";
  }
});

$(document).ready(function() {
  $("#verifyButton").click(function() {
      var commentContent = $("#verificationCode").val(); // 입력된 댓글 내용
      var imageSrc = $("#inputPhoto img").attr("src"); // 이미지의 소스
      
      // 새 댓글 엘리먼트 생성
      var newComment = $("<div>").addClass("flex items-center justify-center text-start");
      var newCommentBox = $("<div>").addClass("h-48 w-80 p-3 text-sm text-start").css("margin-left", "-34px");
      
      // 댓글 내용 추가
      var commentHeader = $("<div>").addClass("flex items-center justify-start");
      var commentLocation = $("<div>").addClass("font-bold").text("인천시 삼산구 삼산 2동");
      var commentAuthor = $("<div>").addClass("text-grey-600 font-medium text-sm ml-5").text("강**");
      commentHeader.append(commentLocation, commentAuthor);
      newCommentBox.append(commentHeader);
      
      // 댓글 내용 추가 
      var commentText = $("<div>").addClass("flex items-start justify-center text-black text-base mt-2").text(commentContent);
      newCommentBox.append(commentText);
      
      // 이미지 추가
      var commentImage = $("<div>").addClass("flex items-center justify-center w-72 h-40 border border-gray-400 mb-1 mt-1").text("사진");
      if (imageSrc) {
          var commentImagePreview = $("<img>").addClass("w-72 h-40 object-cover").attr("src", imageSrc);
          commentImage.empty().append(commentImagePreview);
      }
      newCommentBox.append(commentImage);
      
      $("#inputPhoto").empty();

      //이미지 선택하지 않았을 때 div숨김 처리
      if (!imageSrc) {
        commentImage.hide();
      }
      
  
      // 시간 및 좋아요/싫어요 카운트 추가
      var commentTime = $("<div>").addClass("flex items-center justify-start");
      var commentTimeText = $("<div>").addClass("font-medium text-xs mt-1 ml-5 mr-11").text(getCurrentTime());
      var helpfulCount = $("<div>").addClass("font-light text-xs mt-1 mr-2").text("좋아요 0").attr("id", "helpfulCount1");
      var dislikeCount = $("<div>").addClass("font-light text-xs mt-1").text("싫어요 0").attr("id", "dislikeCount1");
      commentTime.append(commentTimeText, helpfulCount, dislikeCount);
      newCommentBox.append(commentTime);
      
      // 댓글 박스에 내용 추가
      newComment.append(newCommentBox);
      
    
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
//목데이터
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
     <div class="w-80 h-px bg-gray-400 mt-1"></div>
   </div>
   
 </div>

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