$(document).ready(function () {
  var height = $(".newsList").height();
  var move = 0;
  var noticeRollingOff;

  function noticeRolling() {
    move += height;
    $(".news-list").animate({ "top": -move }, 600, function () {
      if (move >= $(".news-list li").length * height) {
        $(this).css("top", 0);
        move = 0;
      }
    });
  }

  noticeRollingOff = setInterval(noticeRolling, 3000);

  $(".news-list_stop").click(function () {
    clearInterval(noticeRollingOff);
  });

  $(".news-list_start").click(function () {
    noticeRollingOff = setInterval(noticeRolling, 1000);
  });

  //json (뉴스)

  function loadnews() {
    return fetch("json/main.json")
      .then((response) => response.json())
      .then((json) => json.news)
      .catch((error) => {
        console.log("실패");
        console.error(error);
      });
  }

  loadnews().then((news) => {
    displayNews(news);
  });

  function displayNews(news) {
    console.log(news);
    const container = document.getElementById("news-item");
    container.innerHTML = news.map((item) => createHTMLString(item)).join("");
    console.log("displaynews");
  }

  function createHTMLString(news) {
    console.log("createhtml");
    return `
      <li class="news-item">
        <a href="#" class="link">${news.content}</a>
      </li>`;
  }
});

