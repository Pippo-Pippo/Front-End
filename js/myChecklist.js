//전역변수
let isEditMode = false;
let currentChecklist = "A";

//통신
$.ajax({
  url: "https://ppiyong.shop/api/checklist", // 요청을 보낼 URL을 입력합니다.
  type: "GET", // HTTP 메서드를 지정합니다. 여기서는 GET을 사용합니다.
  dataType: "json", // 응답 데이터의 유형을 지정합니다. 여기서는 JSON을 사용합니다.
  success: function (data) {
    // 요청이 성공적으로 완료되면 실행되는 콜백 함수입니다.
    // 응답 데이터는 'data' 매개변수에 저장됩니다.
    console.log("get : ", data);
  },
  error: function (jqXHR, textStatus, errorThrown) {
    // 요청이 실패하면 실행되는 콜백 함수입니다.
    console.error(textStatus, errorThrown);
  },
});

//목데이터 적용
$.getJSON("./json/checklist.json", function (data) {
  $.each(data, function (index, checklist) {
    console.log(data);
    const navItem = renderNavItem(checklist.title);
    $(".my-checklists-container").append(navItem);

    if (checklist.title === "A") {
      $.each(checklist.task, function (taskIndex, task) {
        addNewTask(task.content);
      });
    }
  });
});

$(document).ready(function () {
  // 타이틀 클릭시 수정하게 -> 수정모드에만
  content = document.querySelector("[contenteditable]");
  content.addEventListener("click", function (event) {
    if (content.isContentEditable == false) {
      content.contentEditable = true;
      content.textContent = `${event.target.innerHTML}`;
      content.focus();
    } else {
      content.contentEditable = false;
    }
  });

  //추가버튼 클릭
  $("#add-btn").on("click", function () {
    const inputText = $("#checklist-input").val();
    if (inputText !== "") {
      addNewTask(inputText);
      $("#checklist-input").val(""); // 입력창 초기화
    }
  });

  //체크리스트 초기 타이틀
  initNavItem();

  // 체크리스트 타이틀간 이동 효과
  $(".nav-item").on("click", function () {
    $(".nav-item").css("background-color", "rgb(236, 236, 236)"); // gray-300
    $(".nav-item > p").css("color", "black");

    $(this).css("background-color", "rgb(107, 114, 128)"); // gray-600
    $(this).children("p").css("color", "white");
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
}

//delete 버튼 클릭하면 삭제됨
$(document).on("click", ".delete-btn", function () {
  console.log("delete");
  $(this).closest("ul").remove();
});

//제목 nav 렌더링
function renderNavItem(title) {
  const navItem = $("<div>")
    .addClass(
      "nav-item bg-gray-600 w-12 h-12 rounded-full my-2 mr-2 flex justify-center items-center"
    )
    .append($("<p>").addClass("text-white text-2xl text-bold").text(title));

  return navItem;
}

function initNavItem() {
  $(".nav-item:first").css("background-color", "rgb(107, 114, 128)");
  $(".nav-item:first > p").css("color", "white");

  $(".nav-item:not(:first)").css("background-color", "rgb(236, 236, 236)");
  $(".nav-item:not(:first) > p").css("color", "black");
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
    .addClass("delete-btn ml-auto")
    .append(
      $("<img>").attr({
        src: "./img/svg/delete_icon.svg",
        width: "18",
        height: "18",
      })
    );

  return deleteBtn;
}

//태스크 추가
function addNewTask(text) {
  const newTask = $("<div>").addClass(
    "new checklist-task px-4 py-2 flex items-center"
  );
  const taskText = $("<p>").addClass("px-4 text-sm").text(text);

  const checkbox = renderCheckbox();
  const deleteBtn = renderDeleteButton();

  newTask.append(checkbox, taskText, deleteBtn);

  $(".checklist-content").append($("<ul>").append(newTask));
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
