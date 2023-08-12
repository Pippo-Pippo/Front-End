String.prototype.replaceAt = function (index, replacement) {
  if (index >= this.length) {
      return this.valueOf();
  }

  return this.substring(0, index) + replacement + this.substring(index + 1);
}
var alarm_num = 0;
// 백엔드 통신 후 (ajax)
$(document).ready(function () {

    $.ajax({
        type: "GET",
        async: false,
        url: `http://page.ppiyong.shop/api/notification`,
        contentType: "application/json",
        success: function (data) {
            console.log("알림 데이터 가져오기 성공");
            // console.log(data);

            $.each(data, function (index, item) {
                var id = item.id,
                    title = item.title,
                    content = item.content,
                    time = item.createdAt;

                var date = ChangeTime(time);

                //몇분전, 몇시간전 텍스트로 받기
                var timeText = elapsedText(date);

                $(document).ready(function () {
                    const alarm = $("#alarm_message");
                    // Create the inner div with class and content
                    const innerDiv = $('<div>').addClass('pb-2 border-b-2 mt-4');
                    const innerContent = $('<div>').addClass('flex ml-3');
                    const titleDiv = $('<div>').addClass('font-bold text-xl mb-1 mr-2').text(title);
                    const timeDiv = $('<div>').addClass('text-xs ml-auto').text(timeText);
                    const messageDiv = $('<div>').addClass('ml-3 mb-2').text(content);

                    // Build the structure
                    innerContent.append(titleDiv, timeDiv);
                    innerDiv.append(innerContent, messageDiv);
                    alarm.append(innerDiv);

                });
                alarm_num += 1;

            })
            console.log(alarm_num);
            const numDiv = $('<div>').text("아직 확인하지 않은 " + alarm_num + "개의 알림이 있어요");
            $('#alarm_num').append(numDiv);
        },
        error: function (request, status, error) {
            alert(request+status);
        }
    });

});

// 백엔드 통신 전(목데이터)
// $.getJSON("../json/alarm.json", function (data) {
//   $.each(data, function (index, item) {
//       var id = item.id,
//           title = item.title,
//           content = item.content,
//           time = item.createdAt;

//       var date = ChangeTime(time);

//       //몇분전, 몇시간전 텍스트로 받기
//       var timeText = elapsedText(date);

//       $(document).ready(function () {
//           const alarm = $("#alarm_message");
//           // Create the inner div with class and content
//           const innerDiv = $('<div>').addClass('pb-2 border-b-2 mt-4');
//           const innerContent = $('<div>').addClass('flex ml-3');
//           const titleDiv = $('<div>').addClass('font-bold text-xl mb-1 mr-2').text(title);
//           const timeDiv = $('<div>').addClass('text-xs ml-auto').text(timeText);
//           const messageDiv = $('<div>').addClass('ml-3 mb-2').text(content);

//           // Build the structure
//           innerContent.append(titleDiv, timeDiv);
//           innerDiv.append(innerContent, messageDiv);
//           alarm.append(innerDiv);

//       });
//       alarm_num += 1;

//   })
//   console.log(alarm_num);
//   const numDiv = $('<div>').text("아직 확인하지 않은 " + alarm_num + "개의 알림이 있어요");
//   $('#alarm_num').append(numDiv);
// });

//시간 형식바꾸기 함수
function ChangeTime(time) {
  var years = time.substring(0, 4);
  console.log(years);
  var month = Number(time.substring(5, 7)) - 1;
  console.log(month);
  var day = time.substring(8, 10);
  console.log(day);
  var hours = time.substring(11, 13);
  console.log(hours);
  var minute = time.substring(14);
  console.log(minute);
  var date = new Date(years, month, day, hours, minute);
  return date;
};

//시간 바꾸기 함수
function elapsedText(date) {
  // 초 (밀리초)
  const seconds = 1;
  // 분
  const minute = seconds * 60;
  // 시
  const hour = minute * 60;
  // 일
  const day = hour * 24;

  var today = new Date();
  var elapsedTime = Math.trunc((today.getTime() - date.getTime()) / 1000);

  console.log(elapsedTime);
  var elapsedText = "";
  if (elapsedTime < seconds) {
      elapsedText = "방금 전";
  } else if (elapsedTime < minute) {
      elapsedText = "방금 전";
  } else if (elapsedTime < hour) {
      elapsedText = Math.trunc(elapsedTime / minute) + "분 전";
  } else if (elapsedTime < day) {
      elapsedText = Math.trunc(elapsedTime / hour) + "시간 전";
  } else if (elapsedTime < (day * 15)) {
      elapsedText = Math.trunc(elapsedTime / day) + "일 전";
  } else {
      elapsedText = SimpleDateTimeFormat(date, "yyyy.M.d");
  }

  return elapsedText;
}



