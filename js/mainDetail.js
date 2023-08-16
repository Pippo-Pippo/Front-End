//파라미터로 들어온 postId 저장
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

$(document).ready(function () {
  console.log(postId);
  getCommentData(postId);
  $("#imageDiv").click(function () {
    $("#imageBt").trigger("click");
  });

  $("#imageBt").change(function () {
    var file = this.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#imageContainer").html(
        '<img src="' +
          e.target.result +
          '" class="thumbnail object-cover w-72 h-40">'
      );
    };

    reader.readAsDataURL(file);
  });

  $("#create-comment-button").click(function () {
    postComment(postId);
  });
});

//POST - 댓글 입력
function postComment(postId) {
  const location = localStorage.getItem("current_region");
  const content = $("#message").val();

  var fileInput = $("#imageBt")[0];
  var file = fileInput.files[0];

  // FormData 객체 생성
  var formData = new FormData();
  // JSON 데이터 추가
  var data = {
    location: location,
    content: content,
  };

  formData.append("data", JSON.stringify(data));
  formData.append("file", file);

  console.log(file);

  $.ajax({
    url: `https://ppiyong.shop/api/post/${postId}`,
    type: "POST",
    contentType: false,
    processData: false,
    data: formData,
    xhrFields: {
      withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
    },
    success: function (response) {
      console.log(response);
      alert("댓글이 입력되었습니다.");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown);
    },
  });
}

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

//Get 함수
function getCommentData(postId) {
  $.ajax({
    type: "GET",
    url: `https://ppiyong.shop/api/post/${postId}`,
    dataType: "json",
  })
    .success(function (data) {
      console.log(data);
      displayComment(data);
    })
    .error(function (data) {
      console.log(error);
    });
}

function displayComment(data) {
  console.log(data);
  const mainContainer = document.getElementById("main");
  mainContainer.innerHTML = createMainBoxHTML(data);

  const commentContainer = document.getElementById("comment");
  commentContainer.innerHTML = data.comment
    .map((comment, index) => createCommentBoxHTML(comment, index + 1))
    .join("");

  // 카테고리에 따라 버튼 색상 업데이트
  updateButtonColors(data.category.split(" "));
}

// updateButtonColors 함수 추가
function updateButtonColors(categories) {
  const categoryNames = {
    RAIN: "강우",
    HOT: "폭염",
    WIND: "태풍",
    SNOW: "폭설",
    EARTHQUAKE: "지진",
    CIVIL: "민방위",
    LOST: "실종자",
    default: "기타",
  };

  const categoryColors = {
    RAIN: "bg-blue-300",
    HOT: "bg-red-400",
    WIND: "bg-blue-600",
    SNOW: "bg-blue-900",
    EARTHQUAKE: "bg-yellow-600",
    CIVIL: "bg-green-500",
    LOST: "bg-gray-400",
    default: "bg-gray-600",
  };

  const categoryButtonsContainer = document.getElementById("categoryButtons");
  categoryButtonsContainer.innerHTML = ""; // 기존 버튼 삭제

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = categoryNames[category] || categoryNames.default;
    button.className = `w-14 h-7 rounded-full mr-1 text-sm font-medium text-white mb-1 btn ${
      categoryColors[category] || categoryColors.default
    }`;
    categoryButtonsContainer.appendChild(button);
  });
}

// createMainBoxHTML 함수는 그대로 유지
function createMainBoxHTML(data) {
  return `
    <!--메인 박스-->
    <div id="main" class="text-start flex justify-center">
      <div
        class="bg-white rounded-md shadow-md w-80 mt-5 p-4 text-lg font-bold text-start"
      >
        <div class="flex items-center justify-between">
          <div>${data.from}</div>
          <div class="text-grey-600 font-medium text-sm ml-4">${data.time}</div>
        </div>
        <div class="main-content-button-wrapper mb-2">
          <div id="categoryButtons"></div>
        </div>

        <div class="flex items-start justify-center text-black font-medium text-base">
          ${data.content}
        </div>
      </div>
    </div>
  `;
}

function createCommentBoxHTML(comment, commentNumber) {
  return `
  <div class="comment-wrap mt-2 relative text-start w-80">
  <div class="p-2 text-sm text-start">
    <div class="flex items-center justify-start">
      <div class="comment-region font-bold mr-2">
      ${comment.location}
      </div>
      <p>·</p>
      <div
        class="comment-nickname text-grey-600 font-medium text-sm ml-2"
      >
       ${comment.name}
      </div>
    </div>
    ${
      comment.imageUrl
        ? `<div id="inputPhoto" class="flex items-center justify-center mt-2 mb-2">
            <img src="${comment.imageUrl}" alt="Comment Image" class="object-cover w-80 h-40" >
          </div>`
        : ""
    }
    <div
      class="comment-content flex items-start text-black text-base mt-2"
    >
    ${comment.content}
    </div>

    <div class="flex items-center justify-start mb-1">
      <div class="comment-time font-medium text-xs mt-2 mr-11">${
        comment.createdAt
      }</div>
      <!--도움돼요, 싫어요 버튼-->
      <button onclick="likeComment(${comment.id}, ${
    comment.isLike
  })" class="comment-like font-light text-xs mt-1 mr-2">도움돼요 ${
    comment.like
  }</button>
      <button onclick="hateComment(${comment.id}, ${
    comment.isHate
  })" class="comment-hate font-light text-xs mt-1">싫어요 ${
    comment.hate
  }</button>
    </div>

  </div>

  <div
    class="flex items-center justify-center w-80 h-px bg-gray-300 m-2"
  ></div>
</div>
`;
}

//POST - 댓글 좋아요
function likeComment(commentId, isLike) {
  console.log(commentId, isLike);
  if (isLike) {
    $.ajax({
      url: `https://ppiyong.shop/api/comment/${commentId}/like`,
      type: "POST",
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
      },
      success: function (response) {
        console.log(response);
        alert("해당 댓글에 도움돼요라고 표시했어요.");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(textStatus, errorThrown);
      },
    });
  } else {
    alert("이미 도움된다고 표시한 댓글이에요.");
  }
}

//POST - 댓글 싫어요
function hateComment(commentId, isHate) {
  console.log(commentId, isHate);
  if (isHate) {
    $.ajax({
      url: `https://ppiyong.shop/api/comment/${commentId}/hate`,
      type: "POST",
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
      },
      success: function (response) {
        console.log(response);
        alert("해당 댓글에 싫어요라고 표시했어요.");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(textStatus, errorThrown);
      },
    });
  } else {
    alert("이미 싫어요 표시한 댓글이에요.");
  }
}

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
