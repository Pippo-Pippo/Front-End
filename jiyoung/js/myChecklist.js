//전역변수
let isEditMode = false;
let checklistData = [];
let currentChecklistId;

//통신 - 체크리스트 가져오기 (GET)

$(document).ready(function () {
  $.ajax({
    url: "https://ppiyong.shop/api/checklist",
    type: "GET",
    dataType: "json",
    success: function (data) {
      checklistData = data;
      console.log("saved : ", checklistData);

      // 체크리스트 아이템 렌더링
      $.each(checklistData, function (index, checklist) {
        const navItem = renderNavItem(checklist.title[0]);
        navItem.attr("data-checklist-id", checklist.check_list_id);
        $(".my-checklists-container").append(navItem);
      });

      $(".nav-item").on("click", function () {
        const checklistId = $(this).attr("data-checklist-id");
        const checklist = checklistData.find(
          (item) => item.check_list_id == checklistId
        );
        $("#checklist-title-text").text(checklist.title);
        $(".checklist-content").empty();

        $.each(checklist.task, function (taskIndex, task) {
          addNewTask(task.content);
        });

        $("#checklist-delete-button").attr("data-delete-id", checklistId);
      });

      $(".nav-item:first").click();

      renderPlusNavItem();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown);
    },
  });
  // 체크리스트 타이틀간 이동 효과
  $(".nav-item").on("click", function () {
    $(".nav-item").css("background-color", "rgb(236, 236, 236)"); // gray-300
    $(".nav-item > p").css("color", "black");

    $(this).css("background-color", "rgb(107, 114, 128)"); // gray-600
    $(this).children("p").css("color", "white");

    currentChecklistId = $(this).attr("data-checklist-id");
  });

  $(".nav-item:first").click();

  //추가버튼 클릭
  $("#add-btn").on("click", function () {
    const inputText = $("#checklist-input").val();
    if (inputText !== "") {
      addNewTask(inputText);
      $("#checklist-input").val(""); // 입력창 초기화
    }
  });
});

//수정모드 진입
function getEditMode() {
  isEditMode = true;
  console.log("수정모드 진입", isEditMode);

  $(".delete-btn").show();
  $(".checklist-input").show();
  $("#edit-btn").hide();
  $("#edit-done-btn").show();
  $("#checklist-delete-button").show();
  $("#checklist-share-button").hide();
  upDateText(isEditMode);

  //$(".nav-item").on("click", preventClick);
}

//일반모드 진입
function getNormalMode() {
  showPopup();
  isEditMode = false;
  console.log("일반모드 진입", isEditMode);

  $(".delete-btn").hide();
  $(".checklist-input").hide();
  $("#edit-done-btn").hide();
  $("#edit-btn").show();
  $("#checklist-delete-button").hide();
  $("#checklist-share-button").show();

  upDateText(isEditMode);

  $.ajax({
    url: "https://ppiyong.shop/api/checklist/update",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(checklistData),
    success: function (response) {
      console.log("데이터 업데이트 성공!", response);

      // $.ajax({
      //   url: "https://ppiyong.shop/api/checklist",
      //   type: "GET",
      //   dataType: "json",
      //   success: function (data) {
      //     checklistData = data;
      //     console.log("saved : ", checklistData);

      //     // 체크리스트 아이템 렌더링
      //     $.each(checklistData, function (index, checklist) {
      //       const navItem = renderNavItem(checklist.title[0]);
      //       navItem.attr("data-checklist-id", checklist.check_list_id);
      //       $(".my-checklists-container").append(navItem);
      //     });

      //     $(".nav-item").on("click", function () {
      //       const checklistId = $(this).attr("data-checklist-id");
      //       const checklist = checklistData.find(
      //         (item) => item.check_list_id == checklistId
      //       );
      //       $("#checklist-title-text").text(checklist.title);
      //       $(".checklist-content").empty();

      //       $.each(checklist.task, function (taskIndex, task) {
      //         addNewTask(task.content);
      //       });

      //       $("#checklist-delete-button").attr("data-delete-id", checklistId);
      //     });

      //     $(".nav-item:first").click();

      //     renderPlusNavItem();
      //   },
      //   error: function (jqXHR, textStatus, errorThrown) {
      //     console.error(textStatus, errorThrown);
      //   },
      // });
    },
    error: function (error) {
      console.error("데이터 업데이트 실패...", error);
    },
  });
}

//delete 버튼 클릭하면 삭제됨
$(document).on("click", ".delete-btn", function () {
  $(this).closest("ul").remove();
});

//플러스 네비버튼 클릭하면 추가됨
$(document).on("click", "#plus-nav-item", function () {
  handleUpdate();
});

//제목 nav 렌더링
function renderNavItem(title) {
  const navItem = $("<div>")
    .css("background-color", "rgb(236, 236, 236)")
    .addClass(
      "nav-item not-plus bg-gray-600 w-12 h-12 rounded-full my-2 mr-2 flex justify-center items-center"
    )
    .append($("<p>").addClass("text-black text-2xl text-bold").text(title));

  return navItem;
}

// 체크리스트 추가 네비버튼 추가
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

// 체크박스를 렌더링하는 함수
function renderCheckbox() {
  const checkboxWrapper = $("<div>").addClass("flex h-6 items-center");

  const checkboxImg = $("<img>")
    .attr({
      src: "../../img/check_icon.svg",
      width: "18",
      height: "18",
    })
    .css({ display: "none" });

  const checkbox = $("<button>")
    .addClass("w-5 h-5 rounded-full border border-gray-600")
    .append(checkboxImg)
    .css({ width: "18px", height: "18px" })
    .on("click", function () {
      if (isEditMode && checkboxImg.css("display") === "none") {
        checkboxImg.css({ display: "block" }); // 이미지를 표시
      } else if (isEditMode && checkboxImg.css("display") === "block") {
        checkboxImg.css({ display: "none" }); // 이미지를 숨김
      }
    });

  checkboxWrapper.append(checkbox);
  return checkboxWrapper;
}

// 엑스 버튼을 렌더링하는 함수
function renderDeleteButton() {
  const deleteBtn = $("<button>")
    .addClass(`delete-btn ml-auto ${isEditMode ? "" : "hidden"}`)
    .append(
      $("<img>").attr({
        src: "../../img/delete_icon.svg",
        width: "18",
        height: "18",
      })
    );

  return deleteBtn;
}

//태스크 추가
function addNewTask(text) {
  const newTask = $("<div>").addClass(
    "checklist-task px-4 py-2 flex items-center"
  );
  const taskText = $("<p>").addClass("px-4 text-sm").text(text);

  const checkbox = renderCheckbox();
  const deleteBtn = renderDeleteButton();

  newTask.append(checkbox, taskText, deleteBtn);

  $(".checklist-content").append($("<ul>").append(newTask));

  const checklist = checklistData.find(
    (item) => item.check_list_id == currentChecklistId
  );
  console.log(checklist, currentChecklistId);

  let maxTaskId = 0;
  for (let task of checklist.task) {
    if (task.taskId > maxTaskId) {
      maxTaskId = task.taskId;
    }
  }
  const taskId = maxTaskId + 1;
  const addTask = { taskId: taskId, content: text, isComplete: false };

  // 해당 체크리스트의 task 배열에 새 태스크 추가
  checklist["task"].push(addTask);
  console.log(checklistData);
}

//수정모드일시 제목과 태스크 수정
function upDateText(isEditMode) {
  if (isEditMode) {
    $(".warp p").each(function () {
      var originalText = $(this).text();
      var maxlength = $(this).hasClass("font-bold") ? 10 : 16;
      $(this).html(
        `<input class="editInput" type="text" value="${originalText}" maxlength="${maxlength}"/>`
      );
    });
  } else if (!isEditMode) {
    $(".warp .editInput").each(function (index) {
      var updatedText = $(this).val();
      checklistData[index].title = updatedText;
      $(this).replaceWith(updatedText);
      console.log(checklistData);
    });
  }
}

//수정사항 반영 팝업창 1초정도 나타났다가 사라짐
function showPopup() {
  setTimeout(() => {
    $("#update-popup").fadeIn(500);
    $("#update-popup").css({
      position: "absolute",
      top: "50%",
      left: "40%",
      transform: "translate(-50%, -50%)",
    });

    setTimeout(() => {
      $("#update-popup").fadeOut(500);
    }, 1000);
  });
}

//체크리스트 공유하기
function handleShare() {
  alert("여기에 공유하기가 들어가면 되겠죠");
  //div 이미지로 저장하기
}

//체크리스트 삭제하기
function handleDelete() {
  const checklistId = $("#checklist-delete-button").attr("data-delete-id");
  alert("체크리스트 ID: " + checklistId + "를 삭제하겠습니다.");

  console.log(checklistId);

  //통신하기
  $.ajax({
    url: `https://ppiyong.shop/api/checklist/${checklistId}`,
    type: "DELETE",
    contentType: "application/json",
    success: function (response) {
      console.log("체크리스트 삭제 성공!", response);
      $("#plus-nav-item").prev().remove();
      $(".nav-item:first").click();
    },
    error: function (error) {
      console.error("체크리스트 삭제 실패...", error);
    },
  });
}

// 새 체크리스트 추가하기
function handleUpdate() {
  const newChecklist = {
    title: "새 체크리스트",
    task: [],
  };

  // AJAX POST 요청
  $.ajax({
    url: "https://ppiyong.shop/api/checklist",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(newChecklist),
    success: function (response) {
      console.log("체크리스트 추가 성공!", response);

      const navItem = renderNavItem("새");
      $("#plus-nav-item").before(navItem);

      //getEditMode();
      $("#checklist-title-text").text("새 체크리스트");
      $(".checklist-content").empty();

      navItem.click(function () {
        $(".nav-item").css("background-color", "rgb(236, 236, 236)"); // gray-300
        $(".nav-item > p").css("color", "black");

        $(this).css("background-color", "rgb(107, 114, 128)"); // gray-600
        $(this).children("p").css("color", "white");
      });

      // 즉시 클릭 효과 적용
      navItem.click();
    },
    error: function (error) {
      console.error("체크리스트 추가 실패...", error);
    },
  });
}
