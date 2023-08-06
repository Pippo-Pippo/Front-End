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
});

$.getJSON("./json/checklist.json", function (data) {
  $.each(data, function (index, checklist) {
    if (checklist.title === "A") {
      $.each(checklist.task, function (taskIndex, task) {
        addNewTask(task.content);
      });
    }
  });
});

//수정모드 진입
function getEditMode() {
  console.log("수정모드 진입");

  $(".delete-btn").show();
  $(".checklist-input").show();
  $("#edit-btn").hide();
  $("#edit-done-btn").show();
}

//일반모드 진입
function getNormalMode() {
  console.log("일반모드 진입");

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

// 체크박스를 렌더링하는 함수
function renderCheckbox() {
  const checkboxWrapper = $("<div>").addClass("flex h-6 items-center");
  const checkbox = $("<button>")
    .addClass("w-5 h-5 rounded-full border border-gray-600")
    .css({ width: "18px", height: "18px" });
  checkboxWrapper.append(checkbox);
  return checkboxWrapper;
}

// 엑스 버튼을 렌더링하는 함수
function renderDeleteButton() {
  const deleteBtn = $("<button>")
    .addClass("delete-btn ml-auto")
    .css({ width: "18px", height: "18px" })
    .append(
      $("<svg>")
        .attr({
          xmlns: "http://www.w3.org/2000/svg",
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "black",
        })
        .append(
          $("<path>").attr({
            d: "M4.5 4.5L13.5 13.5M4.5 13.5L13.5 4.5L4.5 13.5Z",
            stroke: "#3F3F46",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          })
        )
    );

  return deleteBtn;
}

//태스트만 추가하고 엑스버튼이랑 동그라미는 -> 나중에 추가
function addNewTask(text) {
  console.log(text);
  const newTask = $("<div>").addClass(
    "checklist-task px-4 py-2 flex items-center"
  );
  const taskText = $("<p>").addClass("px-4 text-sm").text(text);

  const checkbox = renderCheckbox();
  const deleteBtn = renderDeleteButton();

  newTask.append(checkbox, taskText, deleteBtn);

  $(".checklist-content").append($("<ul>").append(newTask));
}
