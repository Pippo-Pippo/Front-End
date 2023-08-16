$(document).ready(function () {
  loadChecklists();
  //getMockData();
});

//GET요청
function loadChecklists() {
  $.ajax({
    url: "https://ppiyong.shop/api/checklist",
    type: "GET",
    dataType: "json",
    xhrFields: {
      withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
    },
    success: function (data) {
      console.log("하이");
      localStorage.setItem("checklistData", JSON.stringify(data));
      localStorage.setItem("currentChecklistId", data[0].check_list_id);

      initializeChecklist();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown);
    },
  });
}

//DELETE 요청 - 태스크 삭제
function deleteTask(taskId) {
  $.ajax({
    url: `https://ppiyong.shop/api/checklist/${taskId}`,
    type: "DELETE",
    dataType: "json",
    xhrFields: {
      withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
    },
    body: testData,
    success: function (data) {
      console.log("삭제 완료");
      localStorage.setItem("checklistData", JSON.stringify(data));
      localStorage.setItem("currentChecklistId", data[0].check_list_id);

      initializeChecklist();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown);
    },
  });
}

//DELETE 요청 - 체크리스트 삭제
function deleteChecklist() {
  console.log("하이요");
  const currentChecklistId = localStorage.getItem("currentChecklistId");
  $.ajax({
    url: `https://ppiyong.shop/api/checklist/${currentChecklistId}`,
    type: "DELETE",
    dataType: "json",
    xhrFields: {
      withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
    },
    success: function (data) {
      localStorage.setItem("checklistData", JSON.stringify(data));
      localStorage.setItem("currentChecklistId", data[0].check_list_id);

      initializeChecklist();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown);
    },
  });
}

//$(document).on("click", "#delete-checklist", deleteChecklist());

//POST 요청 ?? 이거 왜 안되냐
function updateChecklist(checklist) {
  delete checklist.check_list_id;
  console.log(checklist);

  const testData = {
    title: "A",
    task: [
      {
        content: "테스트",
      },
    ],
  };

  $.ajax({
    url: "https://ppiyong.shop/api/checklist",
    type: "POST",
    dataType: "json",
    xhrFields: {
      withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
    },
    body: testData,
    success: function (data) {
      localStorage.setItem("checklistData", JSON.stringify(data));
      localStorage.setItem("currentChecklistId", data[0].check_list_id);

      initializeChecklist();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown);
    },
  });
}

//PUT 요청 - checklist title 수정
function changeChecklistTitle(checklist) {
  console.log("PUT요청 : ", checklist);

  $.ajax({
    url: `https://ppiyong.shop/api/checklist/${checklistId}`,
    type: "PUT",
    dataType: "json",
    body: checklist,
    xhrFields: {
      withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키 값을 공유하겠다는 설정
    },
    success: function (data) {
      localStorage.setItem("checklistData", JSON.stringify(data));
      localStorage.setItem("currentChecklistId", data[0].check_list_id);

      initializeChecklist();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown);
    },
  });
}

//체크리스트 초기화
function initializeChecklist() {
  const checklistData = JSON.parse(localStorage.getItem("checklistData"));
  const $myChecklistsContainer = $(".my-checklists-container");
  const $checklistTitleText = $("#checklist-title-text");
  const $checklistContent = $(".checklist-content");

  $.each(checklistData, function (index, checklist) {
    $(".my-checklist-container").empty();
    const navItem = renderNavItem(checklist.title[0], checklist.check_list_id);
    $myChecklistsContainer.append(navItem);
  }); //navItem 렌더링하기

  const checklistId = localStorage.getItem("currentChecklistId");
  const checklist = checklistData.find(
    (item) => item.check_list_id == checklistId
  ); //각각의 체크리스트 가져오기

  console.log();
  $checklistTitleText.text(checklist.title);
  $checklistContent.empty();

  $.each(checklist.task, function (taskIndex, task) {
    renderTask(task.content, taskIndex, task.complete);
  });

  $(".nav-item:first").click();
  renderPlusNavItem();
}

function updateSelectedChecklist(checklistId) {
  const checklistData = JSON.parse(localStorage.getItem("checklistData"));
  const $checklistTitleText = $("#checklist-title-text");
  const $checklistContent = $(".checklist-content");

  const checklist = checklistData.find(
    (item) => item.check_list_id == checklistId
  );

  console.log(checklistId, checklist);

  $checklistTitleText.text(checklist.title);
  $checklistContent.empty();

  $.each(checklist.task, function (taskIndex, task) {
    renderTask(task.content, taskIndex, task.complete);
  });
}

//일반 네비버튼 이벤트 핸들러 -> 전환 효과
$(document).on("click", ".nav-item", function () {
  $(".nav-item").css("background-color", "rgb(236, 236, 236)"); // gray-300
  $(".nav-item > p").css("color", "black");

  $(this).css("background-color", "rgb(107, 114, 128)"); // gray-600
  $(this).children("p").css("color", "white");

  localStorage.setItem("currentChecklistId", $(this).attr("data-checklist-id"));
  updateSelectedChecklist(localStorage.getItem("currentChecklistId"));
});

//테스크 렌더링
function renderTask(text, taskId, completed) {
  const newTask = $("<div>").addClass(
    "checklist-task px-4 py-2 flex items-center"
  );
  const taskText = $("<p>").addClass("px-4 text-sm").text(text);

  const checkbox = renderCheckbox(taskId, completed);
  const deleteBtn = renderDeleteButton(taskId);

  newTask.append(checkbox, taskText, deleteBtn);

  const ulElement = $("<ul>").append(newTask);
  $(".checklist-content").append($("<ul>").append(newTask));

  return ulElement;
}

// 새로운 태스크를 추가
function saveNewTask(text) {
  const storedChecklistData = JSON.parse(localStorage.getItem("checklistData"));
  const currentChecklistId = localStorage.getItem("currentChecklistId");

  const checklist = storedChecklistData.find(
    (item) => item.check_list_id == currentChecklistId
  );

  if (checklist) {
    let maxTaskId = 0;
    for (let task of checklist.task) {
      if (task.taskId > maxTaskId) {
        maxTaskId = task.taskId;
      }
    }

    const taskId = maxTaskId + 1;
    const addTask = {
      taskId: taskId,
      content: text,
      complete: false,
    };

    // 해당 체크리스트의 task 배열에 새 태스크 추가
    checklist.task.push(addTask);

    const ulElement = renderTask(text, taskId, addTask.complete);
    ulElement.attr("data-task-id", taskId); // ul 엘리먼트의 data-task-id 설정

    // 업데이트된 데이터를 다시 로컬 스토리지에 저장
    localStorage.setItem("checklistData", JSON.stringify(storedChecklistData));
  }
}

function addNewTask(text, taskId, complete) {
  saveNewTask(text, taskId, complete);
}
//이거뭐냐 ㅋㅋ

//제목 nav 렌더링
function renderNavItem(title, checklistid) {
  const navItem = $("<div>")
    .css("background-color", "rgb(236, 236, 236)")
    .addClass(
      "nav-item not-plus bg-gray-600 w-12 h-12 rounded-full my-2 mr-2 flex justify-center items-center"
    )
    .append($("<p>").addClass("text-black text-2xl text-bold").text(title))
    .attr("data-checklist-id", checklistid);

  return navItem;
}

// 체크박스를 렌더링하는 함수
function renderCheckbox(taskId, complete) {
  const checkboxWrapper = $("<div>").addClass("flex h-6 items-center");
  const checkboxImg = $("<img>")
    .attr({
      src: "../img/svg/check_icon.svg",
      width: "18",
      height: "18",
    })
    .css({ display: complete === false ? "none" : "block" });

  const checkbox = $("<button>")
    .addClass("checkbox w-5 h-5 rounded-full border border-gray-600")
    .append(checkboxImg)
    .css({ width: "18px", height: "18px" })
    .attr("data-task", taskId);

  checkboxWrapper.append(checkbox);
  return checkboxWrapper;
}

// 엑스 버튼을 렌더링하는 함수
function renderDeleteButton(taskId) {
  const deleteBtn = $("<button>")
    .attr("data-task-id", taskId)
    .addClass(`delete-btn ml-auto`)
    .append(
      $("<img>").attr({
        src: "../../img/svg/delete_icon.svg",
        width: "18",
        height: "18",
      })
    );

  return deleteBtn;
}

//delete 버튼 클릭하면 삭제됨
$(document).on("click", ".delete-btn", function () {
  const taskId = $(this).attr("data-task-id");
  const currentChecklistId = localStorage.getItem("currentChecklistId");
  const storedChecklistData = JSON.parse(localStorage.getItem("checklistData"));

  const targetChecklist = storedChecklistData.find(
    (item) => item.check_list_id == currentChecklistId
  );

  if (targetChecklist) {
    const targetTaskIndex = targetChecklist.task.findIndex(
      (task) => task.taskId == taskId
    );
    targetChecklist.task.splice(targetTaskIndex, 1);
  }

  // 변경된 데이터를 다시 localStorage에 저장
  localStorage.setItem("checklistData", JSON.stringify(storedChecklistData));

  deleteTask(taskId); // ajax delete 요청
  $(this).closest("ul").remove();
});

// 플러스 네비버튼 추가
function renderPlusNavItem() {
  const navItem = $("<div>")
    .css("background-color", "rgb(236, 236, 236)")
    .addClass(
      "w-12 h-12 rounded-full my-2 mr-2 flex justify-center items-center"
    )
    .attr("id", "plus-nav-item")
    .append($("<p>").addClass("text-black text-2xl text-bold").text("+"));

  $(".my-checklists-container").append(navItem);
}

//플러스 네비버튼 이벤트 핸들러 -> 클릭하면 새체크리스트 추가됨
$(document).on("click", "#plus-nav-item", function () {
  if ($(".my-checklists-container").children().length > 4) {
    alert("체크리스트는 최대 4개까지 생성 가능해요!");
    return;
  }

  const storedChecklistData = JSON.parse(localStorage.getItem("checklistData"));
  const newChecklistId = storedChecklistData.length + 1;
  const newChecklist = {
    check_list_id: newChecklistId,
    title: "새 체크리스트",
    task: [],
  };

  storedChecklistData.push(newChecklist);
  localStorage.setItem("checklistData", JSON.stringify(storedChecklistData));

  const navItem = renderNavItem("새", newChecklistId);
  $("#plus-nav-item").before(navItem);
  localStorage.setItem("currentChecklistId", navItem.attr("data-checklist-id"));
  navItem.click();

  updateChecklist(newChecklist);
});

$(document).on("click", "#add-btn", function () {
  const inputText = $("#checklist-input").val();
  if (inputText !== "") {
    addNewTask(inputText);
    $("#checklist-input").val(""); // 입력창 초기화
  }
});

//체크박스 클릭했을 때 효과
$(document).on("click", ".checkbox", function () {
  const taskId = $(this).attr("data-task");
  const currentChecklistId = localStorage.getItem("currentChecklistId");
  const storedChecklistData = JSON.parse(localStorage.getItem("checklistData"));
  const checkboxImg = $(this).find("img");

  let nowComplete;
  if (checkboxImg.css("display") === "none") {
    checkboxImg.css({ display: "block" });
    nowComplete = true;
  } else {
    checkboxImg.css({ display: "none" });
    nowComplete = false;
  }

  const targetChecklist = storedChecklistData.find(
    (item) => item.check_list_id == currentChecklistId
  );

  if (targetChecklist) {
    const targetTaskIndex = targetChecklist.task.findIndex(
      (task) => task.taskId == taskId
    );
    targetChecklist.task[targetTaskIndex + 1].complete = nowComplete;
  }
  // 변경된 데이터를 다시 localStorage에 저장
  localStorage.setItem("checklistData", JSON.stringify(storedChecklistData));
});

//체크리스트 제목 더블클릭하면 바꾸기
$(document).on("click", "#checklist-title-text", function () {
  const originalText = $(this).text();
  $(this).html(
    `<input class="border editInput" type="text" value="${originalText}" maxlength="10"/>`
  );
  $(".editInput").focus();
});

$(document).on("blur", ".editInput", function () {
  const newText = $(this).val();

  const currentChecklistId = localStorage.getItem("currentChecklistId");
  const storedChecklistData = JSON.parse(localStorage.getItem("checklistData"));
  const targetChecklist = storedChecklistData.find(
    (item) => item.check_list_id == currentChecklistId
  );

  if (newText.length === 0 || newText.length > 10) {
    alert("제목은 최소 한 글자 이상 10자 이내이어야 해요!");
    // 원래의 텍스트로 돌려놓기
    const originalText = targetChecklist.title;
    $(this).parent().text(originalText);
    $(".editInput").focus();
  } else {
    targetChecklist.title = newText;
    localStorage.setItem("checklistData", JSON.stringify(storedChecklistData));
    changeChecklistTitle(targetChecklist); //이것만 드가면 되는건가?

    $(this).parent().text(newText);
    $(`.nav-item[data-checklist-id="${currentChecklistId}"] > p`).text(
      newText[0]
    );
  }
});

$(document).on("keypress", ".editInput", function (event) {
  if (event.which == 13) {
    $(this).blur(); // blur 이벤트 핸들러를 호출하여 위의 로직을 실행
  }
});

//공유하기 누르면 이미지(png)로 다운로드
function downImg() {
  alert("체크리스트 이미지가 저장되었어요.");
  html2canvas($(".my-checklist")[0]).then(function (canvas) {
    var myImage = canvas.toDataURL();
    downloadURI(myImage, "myChecklist.png");
  });
}

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
}
