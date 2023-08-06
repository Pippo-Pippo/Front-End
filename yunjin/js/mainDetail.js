function loadComment() {
    return fetch("json/mainDetail.json")
      .then((response) => response.json())
      .then((json) => json.comment)
      .catch((error) => {
        console.log("실패");
        console.error(error);
      });
  }
  
  loadComment().then((comment) => {
    displayComment(comment);
  });
  
  function displayComment(comments) {
    console.log(comments);
    const container = document.getElementById("comment");
    container.innerHTML = comments.map((item) => createHTMLString(item)).join("");
    
  }

  function createHTMLString(comment) {
    
    return `
    <div class = "comment">
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
            <!--도움돼요, 싫어요 버튼-->
            <div class="font-light text-xs mt-1 mr-2">도움돼요 ${comment.like}</div>
          <div class="font-light text-xs mt-1">싫어요 ${comment.hate}</div>
          </div>
          </div>
          </div>
          <div class="w-80 h-px bg-gray-400 my-2 mt-5 ml-4"></div>
        </div>`;
   
  }